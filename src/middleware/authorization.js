/* eslint-disable */
import amplify, { Auth } from 'aws-amplify'

export default function({ store, route, redirect, app, isStatic }) {
  Auth.currentSession()
    .then(verify)
    .catch(fail)
  function verify(data) {
    store.dispatch('auth/setAuthenticated', data)
  }
  function fail(err) {
    if (route.name === 'auth-sign-in') return true
    app.$toast.error(err.message || err)
    store.dispatch('auth/reset')
  }
}
