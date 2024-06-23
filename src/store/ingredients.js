const getIngredients = () =>
  import('~/static/json/ingredients.json').then(m => m.default || m)

const SET_INGREDIENTS = 'SET_INGREDIENTS'

export const state = () => ({
  items: []
})

export const getters = {
  items: state => state.items,
  totalIngredient: state => {
    return state.items.length
  }
}

export const actions = {
  async get({ commit }) {
    let items = await getIngredients()
    commit('SET_INGREDIENTS', items)
  }
}

export const mutations = {
  [SET_INGREDIENTS](state, items) {
    state.items = items
  }
}
