// 普通的reactive是不会收集依赖的，当被effect包裹，会生成一个
const targetMap = new WeakMap()
// const ReactiveEffect = {}
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
  let effect = targetMap.get(target)
  if (!activeEffect) return
  if (!effect) {
    effect = new Set()
  }

  effect.add(activeEffect)
  targetMap.set(target, effect)
}
const trigger = function(target, key, value) {
  const effects = targetMap.get(target)
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
