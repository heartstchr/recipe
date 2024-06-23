const getUser = () =>
  import('~/static/json/user.json').then(m => m.default || m)

const SET_USER = 'SET_USER'

export const state = () => ({
  user: {}
})

export const getters = {
  user: state => state.user
}

export const actions = {
  async get({ commit }) {
    const user = await getUser()
    !state.user && commit('SET_USER', user)
  }
}

export const mutations = {
  [SET_USER](state, user) {
    state.user = user
  }
}
