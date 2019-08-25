import marked from './marked/marked.lib.js'
marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: true,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: false
})
var renderer = new marked.Renderer()
renderer.heading = function (text, level) {
  return `<h${level} class='a-head a-head${level}'>
    <span class='pell-content-line'>${text}</span></h${level}>`
}
// eslint-disable-next-line no-unused-vars
renderer.code = function (code, infostring, escaped) {
  var lang = (infostring || '').match(/\S*/)[0]
  if (marked.options.highlight) {
    var out = marked.options.highlight(code, lang)
    if (out != null && out !== code) {
      escaped = true
      code = out
    }
  }

  if (!lang) {
    return `<pre><code><span>${code} </span></code>
      </pre>`
  }

  return `<pre><code class="lang-${lang}"><span>${code} </span></code>
    </pre>`
}
export default {
  marked: function (data) {
    return marked(data, { renderer: renderer })
  },
  lexer: marked.lexer,
  inlineLexer: marked.inlineLexer
}
