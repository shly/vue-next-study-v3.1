import {reactive} from './reactive.mjs'
import {effect} from './effect.mjs'
import assert from 'assert/strict';
let dummy
const counter = reactive([1])
// effect(() => {
//   dummy = counter.length
// })
counter.unshift(2)
// counter.push(2)