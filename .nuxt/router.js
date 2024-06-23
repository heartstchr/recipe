import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _8a8a9cba = () => interopDefault(import('../src/pages/about.vue' /* webpackChunkName: "pages/about" */))
const _9f76ce02 = () => interopDefault(import('../src/pages/blog/index.vue' /* webpackChunkName: "pages/blog/index" */))
const _ff0a7e42 = () => interopDefault(import('../src/pages/feedback.vue' /* webpackChunkName: "pages/feedback" */))
const _4aac0c2b = () => interopDefault(import('../src/pages/friends.vue' /* webpackChunkName: "pages/friends" */))
const _6e89ca45 = () => interopDefault(import('../src/pages/notification.vue' /* webpackChunkName: "pages/notification" */))
const _21e684fc = () => interopDefault(import('../src/pages/profile/index.vue' /* webpackChunkName: "pages/profile/index" */))
const _325dc12a = () => interopDefault(import('../src/pages/recipe/index.vue' /* webpackChunkName: "pages/recipe/index" */))
const _1f9dda02 = () => interopDefault(import('../src/pages/search.vue' /* webpackChunkName: "pages/search" */))
const _0bb39e8c = () => interopDefault(import('../src/pages/subscriptions.vue' /* webpackChunkName: "pages/subscriptions" */))
const _b73ea4b0 = () => interopDefault(import('../src/pages/auth/sign-in.vue' /* webpackChunkName: "pages/auth/sign-in" */))
const _8e11f7c4 = () => interopDefault(import('../src/pages/auth/sign-up.vue' /* webpackChunkName: "pages/auth/sign-up" */))
const _aa7ea4ec = () => interopDefault(import('../src/pages/profile/edit.vue' /* webpackChunkName: "pages/profile/edit" */))
const _ccab880c = () => interopDefault(import('../src/pages/recipe/add.vue' /* webpackChunkName: "pages/recipe/add" */))
const _4763ea81 = () => interopDefault(import('../src/pages/recipe/edit.vue' /* webpackChunkName: "pages/recipe/edit" */))
const _2a52619e = () => interopDefault(import('../src/pages/recipe/myrecipe.vue' /* webpackChunkName: "pages/recipe/myrecipe" */))
const _4b1ae730 = () => interopDefault(import('../src/pages/index.vue' /* webpackChunkName: "pages/index" */))
const _38660093 = () => interopDefault(import('../src/pages/recipe/_id.vue' /* webpackChunkName: "pages/recipe/_id" */))
const _57dca6c0 = () => interopDefault(import('../src/pages/*.vue' /* webpackChunkName: "pages/*" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/about",
    component: _8a8a9cba,
    name: "about"
  }, {
    path: "/blog",
    component: _9f76ce02,
    name: "blog"
  }, {
    path: "/feedback",
    component: _ff0a7e42,
    name: "feedback"
  }, {
    path: "/friends",
    component: _4aac0c2b,
    name: "friends"
  }, {
    path: "/notification",
    component: _6e89ca45,
    name: "notification"
  }, {
    path: "/profile",
    component: _21e684fc,
    name: "profile"
  }, {
    path: "/recipe",
    component: _325dc12a,
    name: "recipe"
  }, {
    path: "/search",
    component: _1f9dda02,
    name: "search"
  }, {
    path: "/subscriptions",
    component: _0bb39e8c,
    name: "subscriptions"
  }, {
    path: "/auth/sign-in",
    component: _b73ea4b0,
    name: "auth-sign-in"
  }, {
    path: "/auth/sign-up",
    component: _8e11f7c4,
    name: "auth-sign-up"
  }, {
    path: "/profile/edit",
    component: _aa7ea4ec,
    name: "profile-edit"
  }, {
    path: "/recipe/add",
    component: _ccab880c,
    name: "recipe-add"
  }, {
    path: "/recipe/edit",
    component: _4763ea81,
    name: "recipe-edit"
  }, {
    path: "/recipe/myrecipe",
    component: _2a52619e,
    name: "recipe-myrecipe"
  }, {
    path: "/",
    component: _4b1ae730,
    name: "index"
  }, {
    path: "/recipe/:id",
    component: _38660093,
    name: "recipe-id"
  }, {
    path: "/*",
    component: _57dca6c0,
    name: "*"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
