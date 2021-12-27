import { isObject } from "./utils.mjs"
import {
  track,
  trigger
} from './effect.mjs'
let timer = null
const get = (target, key, receiver) => {
  console.log('*******getter', key)
  track(target, key)
  const result = Reflect.get(target, key, receiver)
  return isObject(result) ? reactive(result): result
}
const set = (target, key, value, receiver) => {
  console.log('*******setter', key)
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
