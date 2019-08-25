const state = {
  id: '',
  contents: [],
  createdAT: Date.now(),
  updatedAt: Date.now(),
  type: '',
  folder: '',
  title: '',
  tags: [],
  isStarred: false,
  isTrashed: false
}
const getters = {
  editorProp: (state) => {
    return {
      id: state.id,
      contents: state.contents,
      createdAT: state.createdAT,
      updatedAt: state.updatedAt,
      type: state.type,
      folder: state.folder,
      title: state.title,
      tags: state.tags,
      isStarred: state.isStarred,
      isTrashed: state.isTrashed
    }
  },
  contents: (state) => {
    return state.contents
  }
}
const actions = {
  addContent ({commit}, {content, startIndex}) {
    commit('addContent', {content, startIndex})
  },
  updateContent ({ commit }, content) {
    commit('updateContent', content)
  },
  updateTitle ({commit}, title) {
    commit('updateTitle', title)
  },
  deleteContent ({commit}, content) {
    commit('deleteContent', content)
  },
  loadNote ({commit}, note) {
    commit('loadNote', note)
    if (note.contents) {
      note.contents.forEach(content => {
        commit('updateContent', {content})
      })
    }
  },
  initContentProp({commit}) {
    commit('initContentProp')
  }
}
const mutations = {
  addContent (state, {content, startIndex = state.contents.length}) {
    state.contents.splice(startIndex, 0, content)
  },
  updateContent (state, { content }) {
    state.updatedAt = Date.now()
    let index = state.contents.findIndex((item) => item.cid === content.cid)
    state.contents.splice(index, 1, content)
  },
  updateTitle (state, title) {
    state.updatedAt = Date.now()
    state.title = title
  },
  deleteContent (state, content) {
    let index = state.contents.findIndex((item) => item.cid === content.cid)
    state.contents.splice(index, 1)
  },
  loadNote (state, note) {
    Object.assign(state, note)
  },
  initContentProp(state) {
    state.contents.push({
      cid: 0,
      mdRaw: ''
    })
  }
}
export default {
  state,
  getters,
  actions,
  mutations
}
