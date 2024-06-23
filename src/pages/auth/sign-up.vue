<template>
  <div class="column window-height justify-center items-center bgImg">
    <q-card :style="cardStyle" class="" color="white">
      <q-card-main>
        <q-field
          class="q-pa-sm"
          icon="account_box"
          icon-color="primary"
          label="Register"
          helper="Please register with unique Username"
        >
          <q-input
            v-model="username"
            name="username"
            type="text"
            autofocus
            clearable
            float-label="User Name"
          />
          <q-input
            v-model="email"
            name="Email"
            type="email"
            clearable
            float-label="Email"
          />
          <q-input
            v-model="phone_number"
            name="phone_number"
            type="text"
            clearable
            float-label="Phone Number"
          />
          <q-input
            v-model="password"
            name="password"
            type="password"
            clearable
            float-label="Password"
            @keyup.enter="authenticate"
          />
        </q-field>
      </q-card-main>
      <q-card-actions vertical>
        <q-btn
          :disable="!valid"
          :color="valid ? 'primary' : 'faded'"
          class="full-width"
          @click="$_register"
        >
          Sign Up
        </q-btn>
        <q-card-separator />
        <q-btn flat color="secondary" class="full-width" @click="$_login">
          Login
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
      username: '',
      email: '',
      phone_number: '',
      password: ''
    }
  },
  computed: {
    valid() {
      const { username, password, email, phone_number } = this
      return (
        username.length > 0 &&
        password.length > 0 &&
        email.length > 0 &&
        phone_number.length > 0
      )
    },
    cardStyle() {
      return this.$q.screen.lt.md ? 'width:80vw;' : 'width:40vw;'
    }
  },
  mounted() {
    console.log('>>', this.$store)
  },
  methods: {
    ...mapAuthActions(['SignUp', 'sendChallengeAnswer']),
    async $_register() {
      try {
        if (!this.valid) return false
        const { username, password, email, phone_number } = this
        const res = await this.SignUp({
          username,
          password,
          email,
          phone_number
        })
        console.log('res', res)
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
            this.$_login()
          }
        } else {
          this.$_login()
        }
      } catch (e) {
        //
        console.log(e)
      } finally {
        // this.loading = false
        console.log('finally')
      }
    },
    async $_login() {
      this.$router.push({
        path: '/auth/sign-in',
        component: 'pages/auth/sign-in.vue'
      })
    },
    async $_signUp() {
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
