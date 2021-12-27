// 普通的reactive是不会收集依赖的，当被effect包裹，会生成一个
// 
const targetMap = new WeakMap()
let activeEffect
const effect = function (fn, options) {
  const effect = createReactiveEffect(fn, options)
  activeEffect = effect
  if (!options || !options.lazy) {
    effect()
  }
  return effect
}
function createReactiveEffect(fn, options) {
  const effect = fn
  return effect
}
const track = function (target, key) {
  let keyMaps = targetMap.get(target)
  if (!activeEffect) return
  if (!keyMaps) {
    targetMap.set(target, keyMaps = new Map())
  }
  let effects = keyMaps.get(key)
  if (!effects) {
    keyMaps.set(key, effects = new Set())
  }
  effects.add(activeEffect)
}
const trigger = function(target, key, value) {
  const keyMaps = targetMap.get(target)
  if (!keyMaps) return
  const effects = keyMaps.get(key)
  if(effects) {
    effects.forEach(effect => {
      effect()
    });
  }
}
export {
  track,
  trigger,
  effect
}
