/* eslint-disable */
const SET_FETCHED = 'SET_FETCHED'
const SET_FETCHING = 'SET_FETCHING'
export const state = () => ({
  fetching: false,
  fetched: false
})
export const actions = {
  async fetch({ state: { fetched, fetching }, commit, dispatch }) {
    if (fetched || fetching) return
    commit(SET_FETCHING)
    dispatch(
      'auth/setAuthKeys',
      GLB_CFG.find(x => x.name === 'API_AUTH_KEYS').value,
      { root: true }
    )
    dispatch(
      'auth/setPrivilegedUsers',
      GLB_CFG.find(x => x.name === 'PRIVILEGED_USERS').value,
      { root: true }
    )
    commit(SET_FETCHED)
  }
}

export const mutations = {
  [SET_FETCHING](state) {
    state.fetched = false
    state.fetching = true
  },
  [SET_FETCHED](state) {
    state.fetched = true
    state.fetching = false
  }
}
