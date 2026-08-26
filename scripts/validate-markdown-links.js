#!/usr/bin/env node
/**
 * Validate local Markdown links and heading anchors in public repository docs.
 * External URLs and fenced examples are intentionally out of scope.
 */

'use strict';

const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.resolve(__dirname, '..');
const DOC_ROOTS = [
  'README.md',
  'AGENTS.md',
  'CLAUDE.md',
  'docs',
  'skills',
  'agents',
  'references',
  'tasks',
];
const LINK_RE = /\[[^\]]*\]\(([^)]+)\)/g;

function markdownFiles(relativePath) {
  const absolutePath = path.join(ROOT, relativePath);
  if (!fs.existsSync(absolutePath)) return [];
  const stat = fs.statSync(absolutePath);
  if (stat.isFile()) return absolutePath.endsWith('.md') ? [absolutePath] : [];

  const files = [];
  for (const entry of fs.readdirSync(absolutePath).sort()) {
    files.push(...markdownFiles(path.join(relativePath, entry)));
  }
  return files;
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
  const files = DOC_ROOTS.flatMap(markdownFiles);
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
