<template>
  <q-pull-to-refresh :handler="refresher">
    <q-page class="card-examples items-start">
      <h4 class="noMargin">
        Search
      </h4>
      <q-search
        v-model="modal"
        icon="local_dining"
        inverted-light
        class="margin"
        color="#adadad2b"
        float-label="Search for a recipe"
      />
      <gallery :gallery="gallery" />
    </q-page>
  </q-pull-to-refresh>
</template>

<script>
import { mapGetters } from 'vuex'
import Gallery from '~/components/gallery'
export default {
  components: {
    Gallery
  },
  data() {
    return {
      title: 'Search',
      modal: ''
    }
  },
  computed: {
    ...mapGetters({
      gallery: 'gallery/gallery'
    })
  },
  asyncData({ store }) {
    store.dispatch('gallery/get')
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
