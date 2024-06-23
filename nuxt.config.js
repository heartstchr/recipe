const pkg = require('./package')
const BUILD_ENV = process.env['BUILD_ENV'] || 'dev'

const ENV_CFG = {
  dev: {
    ENV: '',
    COGNITO_APP_CLIENT_ID: '6mevnolpc8lc00jeikpub3ulvn',
    COGNITO_USER_POOL_ID: 'ap-south-1_okqlJDTp6',
    COGNITO_IDENTITY_POOL_ID: 'ap-south-1:5906114d-8b16-4a7c-8fb7-dad09e2e2f11',
    APIG_ENDPOINT: '',
    ASSET_BUCKET_NAME: '',
    ASSETS_BASE_URL: ''
  },
  prod: {
    ENV: '',
    COGNITO_APP_CLIENT_ID: '6mevnolpc8lc00jeikpub3ulvn',
    COGNITO_USER_POOL_ID: 'ap-south-1_okqlJDTp6',
    COGNITO_IDENTITY_POOL_ID: 'ap-south-1:5906114d-8b16-4a7c-8fb7-dad09e2e2f11',
    APIG_ENDPOINT: '',
    ASSET_BUCKET_NAME: '',
    ASSETS_BASE_URL: ''
  }
}
const ENV_ADMIN_API = {
  dev: '',
  prod: ''
}
module.exports = {
  srcDir: 'src/',
  mode: 'spa',
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons'
      }
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  env: {
    VERSION: pkg.version,
    AWS_REGION: 'ap-south-1',
    ...ENV_CFG[BUILD_ENV]
  },
  /*
   ** Global CSS
   */
  css: [`@/assets/themes/app.mat.styl`],
  loading: {
    color: '#16c98d',
    height: '3px'
  },
  loadingIndicator: {
    name: 'cube-grid',
    color: '#185b07'
  },
  toast: {
    position: 'bottom-left',
    duration: 3500
  },
  router: {
    middleware: ['userAgent', 'authorization', 'acl']
  },
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '~/plugins/quasar.conf.js',
    '~/plugins/axios',
    '~plugins/aws-amplify.js',
    '~plugins/vue-validate.js'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/eslint-module',
    '@nuxtjs/toast'
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    baseUrl: ENV_ADMIN_API[BUILD_ENV],
    browserBaseURL: ENV_ADMIN_API[BUILD_ENV]
  },
  generate: {
    routes: async function() {
      const data = require('./src/static/json/recipes.json')
      return data.map(recipe => {
        return '/recipe/' + recipe.id
      })
    }
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    optimization: {
      splitChunks: {
        chunks: 'all',
        automaticNameDelimiter: '.',
        name: undefined,
        cacheGroups: {}
      }
    },
    extend(config, ctx) {
      // Run ESLint on save
      config.resolve.alias['quasar'] = 'quasar-framework/dist/quasar.mat.esm'
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
  dev: process.env.NODE_ENV !== 'production'
}
