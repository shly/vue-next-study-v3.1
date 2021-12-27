import {reactive} from './reactive.mjs'
import {effect} from './effect.mjs'
import assert from 'assert/strict';
let dummy
const counter = reactive({ nested: { num1: 0, num2: 1 } })
effect(() => {
  dummy = counter.nested.num1
  console.log('*****')
})

assert.deepEqual(dummy, 0);
counter.nested.num1 = 8
assert.deepEqual(dummy, 8);