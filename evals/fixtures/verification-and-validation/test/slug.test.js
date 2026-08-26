'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { toSlug } = require('../src/slug');

test('normalizes words and punctuation', () => {
  assert.equal(toSlug('Hello, World!'), 'hello-world');
});

test('collapses repeated separators and removes trailing separators', () => {
  assert.equal(toSlug('  Hello...   World!!!  '), 'hello-world');
});
