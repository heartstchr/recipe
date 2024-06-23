/* eslint-disable */

import { Auth } from 'aws-amplify'
import { Loading } from 'quasar'
const SET_AUTHENTICATED = 'SET_AUTHENTICATED'
const SET_USER_INFO = 'SET_USER_INFO'
const SET_SESSION = 'SET_SESSION'
const SET_AUTH_KEY = 'SET_AUTH_KEY'
const SET_PRIVILEGED_USERS = 'SET_PRIVILEGED_USERS'

export const state = () => ({
  isAuthenticated: false,
  cmsAuthKey: null,
  opsAuthKey: null,
  opsAuthKey: null,
  userInfo: null,
  userName: null,
  session: null,
  privilegedUsers: [],
})

export const getters = {
  isAuthenticated: ({ isAuthenticated }) => isAuthenticated,
  userInfo: ({ userInfo }) => (userInfo ? userInfo.attributes.email : ''),
  session: ({ session }) => session || {},
  cmsAuthKey: ({ cmsAuthKey }) => cmsAuthKey,
  opsAuthKey: ({ opsAuthKey }) => opsAuthKey,
  privileged: ({ userName, privilegedUsers }) =>
    privilegedUsers.includes(userName),
}

export const actions = {
  async signOut({ dispatch }) {
    try {
      await Auth.signOut()
      dispatch('reset')
    } catch (e) {
      this.$toast.error(e.message)
    } finally {
      this.$router.push({ name: 'auth-sign-in' })
    }
  },
  async authenticate({ dispatch }, payload) {
    try {
      console.log('payload',payload)
      const { username, password } = payload
      const res = await Auth.signIn(username, password)
      console.log('res',res)
      if (res.challengeName) return res
      dispatch('setAuthenticated', res.signInUserSession)
    } catch (e) {
      console.error('signIn.catch', e)
      if (e.code==="UserNotConfirmedException"){
        console.log("UserNotConfirmedException")
        return e
      }else{
        this.$toast.error(`${e.message}. Please Register`)
        dispatch('reset')
      }
    } finally {
      Loading.hide()
    }
  },
  async SignUp({ dispatch }, payload) {
    try {
      const { username, email, password, phone_number } = payload
      console.log(this)
      const res = await Auth.signUp(username, password,email)
      console.log('auth res',res)
      this.$toast.success(`We have sent confirmation code. Please enter the confirmation code while login`)
      return res
    } catch (e) {
      if(e.code="UsernameExistsException"){
        this.$toast.success(`We have sent confirmation code. Please enter the confirmation code while login`)
      }
      else{
        this.$toast.error(e.message)
        dispatch('reset')
      }
    }
  },
  async setAuthenticated({ state, commit, dispatch }, payload) {
    if (!state.userInfo) {
      const currentUserInfo = await Auth.currentUserInfo()
      commit(SET_USER_INFO, currentUserInfo)
    }
    commit(SET_SESSION, payload)
    commit(SET_AUTHENTICATED, true)
    // await dispatch('config/fetch', null, { root: true })
    await dispatch('setHeaders')
    if (this.app.context.route.name === 'auth-sign-in') {
      console.log('Authorized')
      this.$router.push('/')
    }
  },
  setPrivilegedUsers({ commit }, privilegedUsers) {
    commit(SET_PRIVILEGED_USERS, privilegedUsers)
  },
  setAuthKeys({ state, commit, getters }, authKeys) {
    commit(SET_AUTH_KEY, authKeys)
  },
  async setHeaders({
    state: {
      userInfo: { username }
    },
    getters: { userInfo, cmsAuthKey, opsAuthKey }
  }) {
    this.$axios.setHeader('X-USER-EMAIL', userInfo)
    this.$axios.setHeader('X-USER-ID', username)
  },
  async reset({ commit }) {
    commit(SET_AUTHENTICATED, false)
    commit(SET_USER_INFO, null)
    commit(SET_SESSION, null)
    if (this.app.context.route.name !== 'auth-sign-in')
      this.$router.push({ name: 'auth-sign-in' })
  },
  async changePasswd({}, { current, proposed }) {
    try {
      const user = await Auth.currentAuthenticatedUser()
      const chpwd = await Auth.changePassword(
        user,
        current.trim(),
        proposed.trim()
      )
      // this.$toast.success(chpwd)
      return chpwd
    } catch (e) {
      // this.$toast.error(e.message, { duration: 5000 })
    }
  },
  async forgotPasswd({}, { username }) {
    try {
      const res = await Auth.forgotPassword(username.trim())
      const {
        CodeDeliveryDetails: { Destination }
      } = res
      this.$toast.success(`Verification code sent to ${Destination}`)
      return Destination
    } catch (e) {
      this.$toast.error(e.message, { duration: 5000 })
    }
  },
  async forgotPasswdSubmit({}, { username, code, new_password }) {
    try {
      await Auth.forgotPasswordSubmit(username, code, new_password)
    } catch (e) {
      this.$toast.error(e.message, { duration: 5000 })
    }
  },
  async sendConfirmAnswer({ dispatch }, { username, code, password}) {
    try {
      const res = await Auth.confirmSignUp(username, code)
      dispatch('authenticate',{username, password})
    } catch (e) {
      this.$toast.error(e.message, { duration: 5000 })
    }
  },
  async sendChallengeAnswer({ dispatch }, { user, challengeResponse }) {
    try {
      const res = await Auth.completeNewPassword(user, challengeResponse)
      dispatch('setAuthenticated', res)
    } catch (e) {
      // this.$toast.error(e.message, { duration: 5000 })
    }
  }
}
export const mutations = {
  [SET_AUTH_KEY](state, { cmsAuthKey, opsAuthKey }) {
    state.cmsAuthKey = cmsAuthKey
    state.opsAuthKey = opsAuthKey
  },
  [SET_SESSION](state, session) {
    state.session = session
  },
  [SET_USER_INFO](state, userInfo) {
    state.userInfo = userInfo
    state.userName = userInfo ? userInfo.attributes.email.split('@')[0] : ''
  },
  [SET_AUTHENTICATED](state, isAuthenticated) {
    state.isAuthenticated = isAuthenticated
  },
  [SET_PRIVILEGED_USERS](state, privilegedUsers) {
    state.privilegedUsers = privilegedUsers
  }
}
