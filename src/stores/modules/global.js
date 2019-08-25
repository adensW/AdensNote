const DEFAULT_FOCUS_STATE = {

  focusedIndex: 0,
  lineLength: 1,
  maxLine: 1

}
const state = {
  focusState: {
    focusedIndex: 0,
    lineLength: 1,
    maxLine: 1
  },
  albumLoaded: false,
  todoLoaded: false,
  editorLoaded: false,
  focusedPannel: 'SIDE_MENU', // "TODO_PANNEL","EDITOR_PANNEL",
  Breadcrumb: []

}
const getters = {
  focusedIndex: (state) => {
    return state.focusState.focusedIndex
  },
  maxLine: (state) => {
    return state.focusState.maxLine
  },
  focusState: (state) => {
    return state.focusState
  },
  focusedPannel: (state) => {
    return state.focusedPannel
  },
  Breadcrumb: (state) => {
    return state.Breadcrumb
  },
  albumLoaded: (state) => {
    return state.albumLoaded
  },
  todoLoaded: (state) => {
    return state.todoLoaded
  },
  editorLoaded: (state) => {
    return state.editorLoaded
  }

}
const actions = {
  prev ({ commit }) {
    commit('prev')
  },
  next ({ commit }) {
    commit('next')
  },
  go ({ commit }, index) {
    commit('go', index)
  },
  addLine ({ commit }) {
    commit('addLine')
  },
  removeLine ({ commit }) {
    commit('removeLine')
  },
  reset ({ commit }) {
    commit('reset')
  },
  init ({ commit }, prop) {
    commit('init', prop)
  },
  updatePannel ({ commit }, name) {
    commit('updatePannel', name)
  },
  updateAlbumLoadState({commit}, loadState) {
    commit('updateAlbumLoadState', loadState)
  },
  updateTodoLoadState({commit}, loadState) {
    commit('updateTodoLoadState', loadState)
  },
  updateEditorLoadState({commit}, loadState) {
    commit('updateEditorLoadState', loadState)
  }
}
const mutations = {
  prev (state) {
    state.focusState.focusedIndex =
      state.focusState.focusedIndex - 1 < 0 ? 0 : state.focusState.focusedIndex - 1
  },
  next (state) {
    state.focusState.focusedIndex =
      state.focusState.focusedIndex + 1 >= state.focusState.lineLength ? state.focusState.lineLength - 1 : state.focusState.focusedIndex + 1
  },
  addLine (state) {
    state.focusState.lineLength += 1
    state.focusState.maxLine += 1
  },
  removeLine (state) {
    state.focusState.lineLength = state.focusState.lineLength - 1 < 0 ? 0 : state.focusState.lineLength - 1
  },
  go (state, { index }) {
    state.focusState.focusedIndex = index
  },
  reset (state) {
    state.focusState = DEFAULT_FOCUS_STATE
  },
  init (state, prop) {
    state.focusState = prop
  },
  updatePannel (state, name) {
    state.focusedPannel = name
  },
  updateAlbumLoadState(state, loadState = false) {
    state.albumLoaded = loadState
  },
  updateTodoLoadState(state, loadState = false) {
    state.todoLoaded = loadState
  },
  updateEditorLoadState(state, loadState = false) {
    state.editorLoaded = loadState
  }
}
export default {
  state,
  getters,
  actions,
  mutations
}
