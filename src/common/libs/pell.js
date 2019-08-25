/* eslint-disable no-unused-expressions */
const defaultParagraphSeparatorString = 'defaultParagraphSeparator'
const formatBlock = 'formatBlock'
const addEventListener = (parent, type, listener) => parent.addEventListener(type, listener)
const appendChild = (parent, child) => parent.appendChild(child)
const createElement = tag => document.createElement(tag)
// const queryCommandValue = command => document.queryCommandValue(command)

export const exec = (command, value = null) => document.execCommand(command, false, value)

const defaultActions = {
}

const defaultClasses = {
  actionbar: 'pell-actionbar',
  button: 'pell-button',
  content: 'pell-content',
  selected: 'pell-button-selected'
}

export const init = settings => {
  const actions = settings.actions
    ? (
      settings.actions.map(action => {
        if (typeof action === 'string') return defaultActions[action]
        else if (defaultActions[action.name]) return { ...defaultActions[action.name], ...action }
        return action
      })
    )
    : Object.keys(defaultActions).map(action => defaultActions[action])

  const classes = { ...defaultClasses, ...settings.classes }

  const defaultParagraphSeparator = settings[defaultParagraphSeparatorString] || 'div'
  // beforeCreateContent
  settings.beforeCreateContent ? settings.beforeCreateContent() : null
  // end
  const content = settings.element.content = createElement('div')
  content.contentEditable = true
  content.className = classes.content
  // afterCreateContent
  settings.afterCreateContent ? settings.afterCreateContent() : null
  // end
  content.oninput = ({ target: { firstChild } }) => {
    // eslint-disable-next-line no-console
    settings.beforeChange ? settings.beforeChange(content.innerText) : null
    if (firstChild && firstChild.nodeType === 3) exec(formatBlock, `<${defaultParagraphSeparator}>`)
    else if (content.innerHTML === '<br>') content.innerHTML = ''
    settings.onChange ? settings.onChange(content.innerText) : null
  }
  content.onkeydown = (event) => {
    // if (event.key === 'Enter' && queryCommandValue(formatBlock) === 'blockquote') {
    //   setTimeout(() => {
    //       exec(formatBlock, `<${defaultParagraphSeparator}>`)
    //     }, 0)
    // }
    if (event.key === 'Enter') {
      event.preventDefault()
      event.stopPropagation()
      settings.renderMarkdown ? settings.renderMarkdown() : null
    }
  }
  content.onkeyup = event => {
    if (event.key === 'Enter') {
      event.preventDefault()
      event.stopPropagation()
    }
  }
  appendChild(settings.element, content)

  actions.forEach(action => {
    const button = createElement('button')
    button.className = classes.button
    button.innerHTML = action.icon
    button.title = action.title
    button.setAttribute('type', 'button')
    button.onclick = () => action.result() && content.focus()

    if (action.state) {
      const handler = () => button.classList[action.state() ? 'add' : 'remove'](classes.selected)
      addEventListener(content, 'keyup', handler)
      addEventListener(content, 'mouseup', handler)
      addEventListener(button, 'click', handler)
    }
  })

  if (settings.styleWithCSS) exec('styleWithCSS')
  exec(defaultParagraphSeparatorString, defaultParagraphSeparator)

  return settings.element
}

export default { exec, init }
