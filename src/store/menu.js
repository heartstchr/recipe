const getMenu = () =>
  import('~/static/json/menu.json').then(m => m.default || m)

const SET_MENU = 'SET_MENU'
const TOGGEL_DRAWER = 'TOGGEL_DRAWER'

export const state = () => ({
  left: false,
  right: false,
  leftMenu: [],
  rightMenu: [],
  easyMenu: [],
  footerMenu: []
})

export const getters = {
  left: state => state.left,
  right: state => state.right,
  leftMenu: state => state.leftMenu,
  rightMenu: state => state.rightMenu,
  easyMenu: state => state.easyMenu,
  footerMenu: state => state.footerMenu
}

export const actions = {
  async get({ commit }) {
    const menu = await getMenu()
    !state.menu && commit('SET_MENU', menu)
  },
  toggleDrawer({ commit }, data) {
    commit('TOGGEL_DRAWER', data)
  }
}

export const mutations = {
  [SET_MENU](state, { left, right, easyMenu, footer }) {
    state.leftMenu = left
    state.rightMenu = right
    state.easyMenu = easyMenu
    state.footerMenu = footer
  },
  [TOGGEL_DRAWER](state, data) {
    state[data] = !state[data]
  }
}
