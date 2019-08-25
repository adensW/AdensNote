import Vue from 'vue'
import Vuex from 'vuex'
import editor from './stores/modules/editor'
import todo from './stores/modules/todo'
import album from './stores/modules/album'
import config from './stores/modules/config'
import storage from './stores/modules/storage'
import global from './stores/modules/global'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {

  },
  mutations: {

  },
  actions: {

  },
  modules: {
    editor,
    config,
    storage,
    global,
    todo,
    album
  }
})
if (module.hot) {
  let modules = [
    './stores/modules/editor',
    './stores/modules/config',
    './stores/modules/storage',
    './stores/modules/global',
    './stores/molules/todo',
    './stores/molules/album'
  ]
  // 使 action 和 mutation 成为可热重载模块
  module.hot.accept(modules, () => {
    // 获取更新后的模块
    // 因为 babel 6 的模块编译格式问题，这里需要加上 `.default`
    const editor = require('./stores/modules/editor').default
    const config = require('./stores/modules/config').default
    const storage = require('./stores/modules/storage').default
    const global = require('./stores/modules/global').default
    const todo = require('./stores/modules/todo').default
    const album = require('./stores/modules/album').default
    // 加载新模块
    store.hotUpdate({
      modules: {
        editor: editor,
        config: config,
        storage: storage,
        global: global,
        todo: todo,
        album: album
      }
    })
  })
}
export default store
