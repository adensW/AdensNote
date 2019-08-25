const selection = window.getSelection()
function context (node) {
  let anchorNode = node | selection.anchorNode
  return anchorNode;
}
export default context
