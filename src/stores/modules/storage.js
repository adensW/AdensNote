import api from 'apis/electronApi.js'
const storageProp = {
  id: '',
  name: '',
  path: '',
  isOpen: false
}
const state = {
  STORAGES: [
    {
      id: '1',
      name: 'default',
      rootPath: `${api.getAppPath()}\\storage`,
      albumsPath: `${api.getAppPath()}\\storage\\albums.json`,
      todoPath: `${api.getAppPath()}\\storage\\todos`,
      notePath: `${api.getAppPath()}\\storage\\notes`,
      configPath: `${api.getAppPath()}\\storage\\config.json`,
      isOpen: true
    }
  ]
}
const getters = {
  storage: (state) => {
    return state.STORAGES.find(o => o.isOpen === true)
  },
  notePath: (state) => {
    return state.STORAGES.find(o => o.isOpen === true).notePath
  },
  todoPath: (state) => {
    return state.STORAGES.find(o => o.isOpen === true).todoPath
  }
}
const actions = {
  addStorage ({ commit }, storage) {
    commit('addStorage', storage)
  },
  updateStorage ({ commit }, originId, storage) {
    commit('updateStorage', { originId, storage })
  }
}
const mutations = {
  addStorage (state, { storage }) {
    state.STORAGES.push(Object.assign({}, storageProp, storage))
  },
  updateStorage (state, { originId, storage }) {
    state.STORAGES.map(item => {
      if (item.id === originId) {
        Object.assign(item, storage)
      }
    })
  }
}
export default {
  state,
  getters,
  actions,
  mutations
}
