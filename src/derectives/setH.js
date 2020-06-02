export default {
  inserted: (el, binding) => {
    if (typeof binding.value === 'number') {
      let value = binding.value + 'px'
      if (binding.arg === 'max') { // 最大高度
        el.style.maxHeight = value
      } else if (binding.arg === 'min') { // 最小高度
        el.style.minHeight = value
      } else { // 定高
        el.style.height = value
      }
    }
  }
}
