<template>
  <div class="column window-height justify-center items-center bgImg">
    <q-card :style="cardStyle" class="" color="white">
      <q-card-main>
        <q-field
          class="q-pa-sm"
          icon="accessibility"
          icon-color="primary"
          label="Login"
          helper="Please provide Username and Password"
        >
          <q-input
            v-model="username"
            name="username"
            type="text"
            autofocus
            clearable
            placeholder="User Name"
            float-label="User Name"
            @keyup.enter="$_authenticate"
          />
          <q-input
            v-model="password"
            name="password"
            type="password"
            clearable
            placeholder="Password"
            float-label="Password"
            @keyup.enter="$_authenticate"
          />
        </q-field>
        <q-card-actions class="justify-end">
          <q-btn
            flat
            color="primary"
            class="pull-right on-left"
            @click="$_forgot"
          >
            forgot password ?
          </q-btn>
        </q-card-actions>
      </q-card-main>
      <q-card-actions vertical>
        <q-btn
          :disable="!valid"
          :color="valid ? 'primary' : 'faded'"
          class="full-width"
          @click="$_authenticate"
        >
          login
        </q-btn>
        <q-card-separator />
        <q-btn flat color="secondary" class="full-width" @click="$_signUp">
          Register
        </q-btn>
      </q-card-actions>
    </q-card>
  </div>
</template>
<script>
import { PromptDialog } from '@/utils/dialogs'
import { createNamespacedHelpers } from 'vuex'
const mapAuthActions = createNamespacedHelpers('auth').mapActions

export default {
  name: 'SignIn',
  data() {
    return {
      loading: false,
      username: '',
      password: ''
    }
  },
  computed: {
    valid() {
      const { username, password } = this
      return username.length > 0 && password.length > 0
    },
    cardStyle() {
      return this.$q.screen.lt.md ? 'width:80vw;' : 'width:40vw;'
    }
  },
  mounted() {
    console.log('>>', this.$store)
  },
  methods: {
    ...mapAuthActions([
      'authenticate',
      'forgotPasswd',
      'forgotPasswdSubmit',
      'sendChallengeAnswer',
      'sendConfirmAnswer'
    ]),
    async $_authenticate() {
      try {
        if (!this.valid) return false
        this.loading = true
        const { username, password } = this
        const res = await this.authenticate({ username, password })
        console.log('res login', res)
        if (res && res.challengeName) {
          const { challengeName } = res
          this.$toast.info(challengeName)
          if (challengeName === 'NEW_PASSWORD_REQUIRED') {
            const new_password = await PromptDialog({
              title: challengeName,
              type: 'text',
              message: `Enter New Password`
            })
            await this.sendChallengeAnswer({
              user: res,
              challengeResponse: new_password
            })
          }
        } else if (res.code === 'UserNotConfirmedException') {
          const code = await PromptDialog({
            title: 'User confirmation code',
            type: 'text',
            message: `Enter Code send to your email`
          })
          await this.sendConfirmAnswer({
            username,
            code,
            password
          })
        }
        this.loading = false
      } catch (e) {
        //
        console.log(e)
      } finally {
        this.loading = false
        console.log('finally')
      }
    },
    async $_forgot() {
      try {
        // const { username } = this
        const username = await PromptDialog({
          title: 'Forgot Password',
          model: username,
          type: 'text',
          message: 'User Name'
        })
        const destination = await this.forgotPasswd({ username: username })
        if (destination) {
          const code = await PromptDialog({
            title: 'Password reset code',
            type: 'text',
            message: `Sent to ${destination}`
          })
          const new_password = await PromptDialog({
            title: 'New Password',
            type: 'text',
            message: `Enter New Password`
          })
          await this.forgotPasswdSubmit({
            username: username,
            code,
            new_password
          })
          this.username = username
          this.password = new_password
          await this.$_authenticate()
        }
      } catch (e) {
        this.$toast.error(e.message)
      }
    },
    $_signUp() {
      this.$router.push({
        path: '/auth/sign-up',
        component: 'pages/auth/sign-up.vue'
      })
    }
  }
}
</script>

<style scoped lang="stylus">
.container
  display grid
  grid-gap 20px
  grid-template-columns 50vw
  justify-content center
  width 100vw
.bgImg
  background url("https://cdn.pixabay.com/photo/2016/12/26/17/28/food-1932466_1280.jpg") -251px -150px
</style>
