function parents (cur, parentClassName, untilNode) {
  while ((cur.nodeType !== 9 && cur !== untilNode) || document.getElementById('html')) {
    if (cur.nodeType === 1 && cur.classList.contains(parentClassName)) {
      return cur
    }
    cur = cur.parentNode
  }
}
export default parents
