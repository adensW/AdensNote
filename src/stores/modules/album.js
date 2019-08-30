import uid from 'apis/uid.js'
import api from 'apis/electronApi.js'
import fs from 'libs/files.js';
const DEFAULT_ALBUM = {
  id: uid(),
  name: 'default',
  notePath: `${api.getAppPath()}\\storage\\notes\\`,
  todoPath: `${api.getAppPath()}\\storage\\todos\\`,
  createdAT: Date.now(),
  updatedAt: Date.now(),
  tags: [],
  isStarred: false,
  isTrashed: false,
  toDoCollection: [{
    id: uid(),
    name: '',
    isTrashed: false
  }]
}
const DEFAULT_TODO_COLLECTION = {
  id: uid()
}
const state = {
  albums: [
  ],
  saved: false

}
const getters = {
  albums: (state) => {
    return state.albums
  }
}
const actions = {
  addTodoCollection({ commit }, todo) {
    commit('addTodoCollection', todo)
  },
  updateTodoCollection({ commit }, todo) {
    commit('updateTodoCollection', todo)
  },
  deleteTodoCollection({ commit }, todo) {
    commit('deleteTodoCollection', todo)
  },
  addAlbum({ commit }, album) {
    commit('addAlbum', album)
  },
  loadAlbum({ commit }, album) {
    commit('loadAlbum', album)
  },
  updateAlbum({ commit }, album) {
    commit('updateAlbum', album)
  },
  deleteAlbum({ commit }, album) {
    commit('deleteAlbum', album)
  },
  saveAlbum({ commit, state }) {
    fs.writeFile(`${api.getAppPath()}\\storage\\albums.json`, JSON.stringify(state.albums[0]))
    commit('saveAlbum')
  },
  initAlbum({commit}) {
    commit('initAlbum')
  }
}
const mutations = {
  addTodoCollection(state, todo) {
    state.albums[0].toDoCollection.push(Object.assign(DEFAULT_TODO_COLLECTION, todo))
  },
  updateTodoCollection(state, todo) {
    let item = state.albums[0].toDoCollection.find(o => o.id === todo.id)
    let index = state.albums[0].toDoCollection.findIndex(o => o.id === todo.id)

    state.albums[0].toDoCollection.splice(index, 1, Object.assign(item, todo))
  },
  deleteTodoCollection(state, todo) {
    let index = state.albums[0].toDoCollection.findIndex(o => o.id === todo.id)
    state.albums[0].toDoCollection.splice(index, 1)
  },
  addAlbum(state, album) {
    state.albums.push(Object.assign(DEFAULT_ALBUM, album))
  },
  updateAlbum(state, album) {
    let item = state.albums.find(o => o.id === album.id)
    let index = state.albums.findIndex(o => o.id === album.id)

    state.albums.splice(index, 1, Object.assign(item, album))
  },
  deleteAlbum(state, album) {
    let index = state.albums.findIndex(o => o.id === album.id)
    state.albums.splice(index, 1)
  },
  saveAlbum(state) {
    state.saved = true;
  },
  loadAlbum(state, album) {
    state.albums.push(Object.assign(DEFAULT_ALBUM, album))
  },
  initAlbum(state) {
    if (state.albums.length === 0) {
      state.albums.push(DEFAULT_ALBUM);
    }
  }
}
export default {
  state,
  getters,
  actions,
  mutations
}
