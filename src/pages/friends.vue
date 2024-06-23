<template>
  <div>
    <q-card-title>My Friends</q-card-title>
    <q-item>
      <div class="row">
        <div
          v-for="(sub, index) in user.subscription"
          :key="index"
          class="col-6 q-pa-sm friend"
        >
          <q-card inline>
            <q-card-media>
              <q-parallax :src="sub.img" :height="150">
                <div slot="loading">Loading...</div>
              </q-parallax>
            </q-card-media>
            <q-card-title>
              {{ sub.account }}
              <q-btn flat dense right>
                <q-icon name="chat" />
              </q-btn>
            </q-card-title>
          </q-card>
        </div>
      </div>
    </q-item>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters({
      user: 'user/user'
    })
  },
  asyncData({ store }) {
    store.dispatch('user/get')
  }
}
</script>

<style>
.q-card {
  width: 100%;
}
.row {
  width: 100%;
}
.friend {
  min-height: 250px;
}
</style>
