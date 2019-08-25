const state = {
  id: '',
  todos: [],
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
  todoProp: (state) => {
    return {
      id: state.id,
      todos: state.todos,
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
  todos: (state) => {
    return state.todos
  }
}
const actions = {
  updateTodoProp ({ commit }, prop) {
    commit('updateTodoProp', prop)
  },
  updateTodo ({ commit }, todo) {
    commit('updateTodo', todo)
  },
  addTodo ({ commit }, { todo, startIndex }) {
    commit('addTodo', { todo, startIndex })
  },
  deleteTodo ({ commit }, todo) {
    commit('deleteTodo', todo)
  },
  loadTodoProp({commit}, prop) {
    commit('updateTodoProp', prop)
  }
}
const mutations = {
  updateTodoProp (state, prop) {
    Object.assign(state, prop)
  },
  updateTodo (state, todo) {
    let index = state.todos.findIndex((item) => item.id === todo.id)
    state.todos.splice(index, 1, todo)
  },
  addTodo (state, { todo, startIndex = state.todos.length }) {
    state.todos.splice(startIndex, 0, todo)
  },
  deleteTodo (state, todo) {
    let index = state.todos.findIndex((item) => item.id === todo.id)
    state.todos.splice(index, 1)
  }
}
export default {
  state,
  getters,
  actions,
  mutations
}
