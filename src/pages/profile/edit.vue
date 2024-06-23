<template>
  <q-pull-to-refresh :handler="refresher">
    <q-page class="card-examples items-start q-ma-xs">
      <h4 class="noMargin">
        Edit Profile
      </h4>
      <q-field
        class="q-ma-sm"
        icon="person_outline"
        icon-color="primary"
        label="Profile"
        helper="Details of Person"
      >
        <q-input v-model="user.name" float-label="Name" />
        <q-input v-model="user.bio" float-label="Bio" count />
      </q-field>
      <q-field
        class="q-ma-sm"
        icon="https"
        icon-color="primary"
        label="Private Information"
        helper="Contact details"
      >
        <q-input v-model="user.email" float-label="E-mail Address" />
        <q-input v-model="user.phoneNumber" float-label="Phone number" />
        <q-input v-model="user.sex" float-label="Gender" />
        <q-input v-model="user.weight" float-label="Weight" />
      </q-field>
    </q-page>
  </q-pull-to-refresh>
</template>

<script>
export default {
  data() {
    return {
      user: {}
    }
  },
  methods: {
    $_next() {
      this.$refs.stepper.next()
    },
    refresher(done) {
      // setTimeout(() => {
      done()
      //   this.recipesItems.push({})
      //   this.$q.notify('Item #' + this.recipesItems.length + ' is new.')
      // }, 1000)
    }
  },
  head() {
    return {
      title: this.title,
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        {
          hid: 'description',
          name: 'description',
          content: 'I love food'
        }
      ]
    }
  }
}
</script>

<style>
.q-stepper-horizontal > .q-stepper-header .q-stepper-tab {
  padding: 4px;
}
</style>
