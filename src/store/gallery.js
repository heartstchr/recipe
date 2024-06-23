const getGallery = () =>
  import('~/static/json/gallery.json').then(m => m.default || m)

const SET_GALLERY = 'SET_GALLERY'

export const state = () => ({
  gallery: []
})

export const getters = {
  gallery: state => state.gallery
}

export const actions = {
  async get({ commit }) {
    let gallery = await getGallery()
    commit('SET_GALLERY', gallery)
  }
}

export const mutations = {
  [SET_GALLERY](state, gallery) {
    state.gallery = gallery
  }
}
