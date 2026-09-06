'use strict';

const assert = require('node:assert/strict');
const test = require('node:test');
const { visibleReports } = require('./reports');

test('hides archived reports without changing the visible object', () => {
  const visible = { id: 1, title: 'Quarterly', archived: false };
  assert.deepEqual(visibleReports([visible, { id: 2, archived: true }]), [visible]);
});
