import { isObject } from "./utils.mjs"
import {
  track,
  trigger
} from './effect.mjs'

const get = (target, key, receiver) => {
  track(target, key)
  return Reflect.get(target, key, receiver)
}
const set = (target, key, value, receiver) => {
  Reflect.set(target, key, value, receiver)
  trigger(target, key, value)
  return true
}

const reactiveMap = new WeakMap()
function reactive(target) {
  if (!isObject(target)) {
    console.warn(`value cannot be made reactive: ${String(target)}`)
    return target
  }
  let targetProxy = reactiveMap.get(target)
  if (targetProxy) return targetProxy
  targetProxy = new Proxy(target, {
    get,
    set,
  })
  reactiveMap.set(target, targetProxy)
  return targetProxy
}

export {reactive}
