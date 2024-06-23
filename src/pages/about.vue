<template>
  <q-pull-to-refresh :handler="refresher">
    <q-page class="card-examples items-start">
      <h4 class="noMargin">
        About
      </h4>
      <q-card class="q-ma-xs">
        <div class="q-video">
          <iframe
            width="853"
            height="480"
            src="https://www.youtube.com/watch?v=hjGX0vsBaV0"
            frameborder="0"
            allowfullscreen
          ></iframe>
        </div>
      </q-card>
    </q-page>
  </q-pull-to-refresh>
</template>

<script>
export default {
  data() {
    return {
      title: 'About'
    }
  },
  methods: {
    refresher(done) {
      console.log(this.recipesItems)
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

<style></style>
