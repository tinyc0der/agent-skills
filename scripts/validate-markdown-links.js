#!/usr/bin/env node
/**
 * Validate local Markdown links and heading anchors in tracked repository docs.
 * External URLs and fenced examples are intentionally out of scope.
 */

'use strict';

const fs = require('node:fs');
const path = require('node:path');
const { spawnSync } = require('node:child_process');

const ROOT = path.resolve(__dirname, '..');
const LINK_RE = /\[[^\]]*\]\(([^)]+)\)/g;

function trackedMarkdownFiles() {
  const result = spawnSync('git', ['ls-files', '-z', '--', '*.md'], {
    cwd: ROOT,
    encoding: 'utf8',
  });
  if (result.status !== 0) {
    const detail = (result.stderr || result.error?.message || 'unknown error').trim();
    throw new Error(`Unable to list tracked Markdown files: ${detail}`);
  }
  return result.stdout
    .split('\0')
    .filter(Boolean)
    .sort()
    .map(relativePath => path.join(ROOT, relativePath));
}

function visibleMarkdown(content) {
  let fenced = false;
  return content
    .split(/\r?\n/)
    .map(line => {
      if (/^\s*(```|~~~)/.test(line)) {
        fenced = !fenced;
        return '';
      }
      return fenced ? '' : line;
    })
    .join('\n');
}

function parseTarget(rawTarget) {
  const trimmed = rawTarget.trim();
  if (trimmed.startsWith('<')) {
    const end = trimmed.indexOf('>');
    return end === -1 ? trimmed : trimmed.slice(1, end);
  }
  return trimmed.split(/\s+/)[0];
}

function slugifyHeading(heading) {
  return heading
    .replace(/<[^>]*>/g, '')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/[`*_~]/g, '')
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s_-]/gu, '')
    .trim()
    .replace(/\s/g, '-');
}

function anchorsFor(markdownFile) {
  const content = visibleMarkdown(fs.readFileSync(markdownFile, 'utf8'));
  const anchors = new Set();
  const counts = new Map();

  for (const line of content.split(/\r?\n/)) {
    const heading = line.match(/^\s{0,3}#{1,6}\s+(.+?)\s*#*\s*$/);
    if (heading) {
      const base = slugifyHeading(heading[1]);
      const count = counts.get(base) || 0;
      anchors.add(count === 0 ? base : `${base}-${count}`);
      counts.set(base, count + 1);
    }
    for (const idMatch of line.matchAll(/\bid=["']([^"']+)["']/g)) {
      anchors.add(idMatch[1]);
    }
  }
  return anchors;
}

function main() {
  console.log('Checking local Markdown links and anchors...\n');
  const files = trackedMarkdownFiles();
  const errors = [];

  for (const sourceFile of files) {
    const content = visibleMarkdown(fs.readFileSync(sourceFile, 'utf8'));
    for (const match of content.matchAll(LINK_RE)) {
      const target = parseTarget(match[1]);
      if (!target || /^(?:https?:|mailto:|tel:)/i.test(target)) continue;
      if (target.includes('[') || target.includes('{')) continue;

      const [rawPath, rawFragment] = target.split('#', 2);
      let targetFile = sourceFile;
      if (rawPath) {
        try {
          targetFile = path.resolve(path.dirname(sourceFile), decodeURIComponent(rawPath));
        } catch {
          errors.push({ sourceFile, target, reason: 'contains invalid URL encoding' });
          continue;
        }
      }

      if (!fs.existsSync(targetFile)) {
        errors.push({ sourceFile, target, reason: 'target file does not exist' });
        continue;
      }

      if (rawFragment && targetFile.endsWith('.md')) {
        let fragment;
        try {
          fragment = decodeURIComponent(rawFragment).toLowerCase();
        } catch {
          errors.push({ sourceFile, target, reason: 'contains invalid anchor encoding' });
          continue;
        }
        if (!anchorsFor(targetFile).has(fragment)) {
          errors.push({ sourceFile, target, reason: 'anchor does not exist' });
        }
      }
    }
  }

  for (const { sourceFile, target, reason } of errors) {
    console.log(`  ✗  ${path.relative(ROOT, sourceFile)}: ${target} — ${reason}`);
  }

  const status = errors.length ? 'FAILED' : 'PASSED';
  console.log(`\n${files.length} Markdown files checked — ${errors.length} error(s) — ${status}`);
  if (errors.length) process.exit(1);
}

main();
