import {reactive} from './reactive.mjs'
import {effect} from './effect.mjs'
import assert from 'assert/strict';
let dummy
const counter = reactive({ num1: 0, num2: 0 })
effect(() => (dummy = counter.num1 + counter.num1 + counter.num2))

// expect(dummy).toBe(0)
assert.deepEqual(dummy, 0);
counter.num1 = counter.num2 = 7
// expect(dummy).toBe(14)
assert.deepEqual(dummy, 14);