export default {
  inserted: (el, binding) => {
    if (typeof binding.value === 'number') {
      el.style.height = binding.value + 'px'
    }
  }
}
