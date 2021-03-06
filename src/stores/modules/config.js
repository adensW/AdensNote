const win = global.process.platform === 'win32'
const state = {
  hotKeys: {

  },
  ui: {
    language: 'zh',
    theme: 'default',
    defaultNote: 'ALWAYS_ASK', // ALWAYS_ASK,TODO_NOTE,MARKDOWN_NOTE
    showMenuBar: false
  },
  editor: {
    theme: 'base16-light',
    keyMap: 'sublime',
    fontSize: '14',
    fontFamily: win ? 'Consolas' : 'Monaco',
    indentType: 'space',
    indentSize: '2',
    lineWrapping: true,
    enableRulers: false,
    rulers: [80, 120],
    displayLineNumbers: true,
    matchingPairs: '()[]{}\'\'""$$**``~~__',
    matchingTriples: '```"""\'\'\'',
    explodingPairs: '[]{}``$$',
    switchPreview: 'BLUR', // 'BLUR', 'DBL_CLICK', 'RIGHTCLICK'
    delfaultStatus: 'PREVIEW', // 'PREVIEW', 'CODE'
    scrollPastEnd: false,
    type: 'SPLIT', // 'SPLIT', 'EDITOR_PREVIEW'
    fetchUrlTitle: true,
    enableTableEditor: false,
    enableFrontMatterTitle: true,
    frontMatterTitleField: 'title',
    spellcheck: false,
    enableSmartPaste: false,
    enableMarkdownLint: false

  },
  blog: {
    type: 'wordpress', // Available value: wordpress, add more types in the future plz
    address: 'http://wordpress.com/wp-json',
    authMethod: 'JWT', // Available value: JWT, USER
    token: '',
    username: '',
    password: ''
  }
}
const getters = {
  hotKeys: (state) => {
    return {
      hotKeys: state.hotKeys
    }
  }

}
const actions = {
  updateHotKeys ({ commit }, hotKeys) {
    commit('updateHotKeys', hotKeys)
  }
}
const mutations = {
  updateHotKeys (state, { hotKeys }) {
    state.content = Object.assign({}, state.hotKeys, hotKeys)
  }
}
export default {
  state,
  getters,
  actions,
  mutations
}
