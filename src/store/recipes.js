const getRecipe = () =>
  import('~/static/json/recipes.json').then(m => m.default || m)

const SET_RECIPES = 'SET_RECIPES'

export const state = () => ({
  items: []
})

export const getters = {
  items: state => state.items,
  totalRecipes: state => {
    return state.items.length
  }
}

export const actions = {
  async get({ commit }) {
    let recipes = await getRecipe()
    commit('SET_RECIPES', recipes)
  }
}

export const mutations = {
  [SET_RECIPES](state, recipes) {
    state.items = recipes
  }
}
