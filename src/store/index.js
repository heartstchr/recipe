export const state = () => ({
  activeService: 'test'
})

export const getters = {
  activeService(state) {
    return state.activeService
  }
}
