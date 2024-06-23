<template>
  <div>
    <q-card-media class="coverPhoto">
      <img :src="user.coverPhoto" />
    </q-card-media>
    <q-item class="relative-position">
      <img :src="user.avatar" class="profile" />
      <q-item-main>
        <q-item-tile label>
          {{ user.name }}
        </q-item-tile>
        <q-item-tile sublabel>
          {{ user.bio }}
        </q-item-tile>
      </q-item-main>
    </q-item>
    <q-item class="row justify-center text-center">
      <div class="col justify-center">
        <div>{{ user.posts.length }}</div>
        <div>Posts</div>
      </div>
      <div class="col justify-center">
        <div>{{ user.followers }}</div>
        <div>Followers</div>
      </div>
      <div class="col justify-center">
        <div>{{ user.following }}</div>
        <div>Following</div>
      </div>
    </q-item>
    <q-item>
      <q-btn
        label="Edit Profile"
        class="full-width"
        inverted
        @click="editProfile()"
      />
    </q-item>
    <q-item-separator />
    <q-item>
      <q-btn label="Logout" class="full-width" inverted @click="signOut()" />
    </q-item>
    <q-item-separator />
    <q-card-title>Subscription</q-card-title>
    <q-item>
      <q-card
        v-for="(sub, index) in user.subscription"
        :key="index"
        inline
        class="q-ma-sm"
      >
        <q-card-media>
          <q-parallax :src="sub.img" :height="150">
            <div slot="loading">Loading...</div>
          </q-parallax>
          <q-card-title slot="overlay">
            {{ sub.account }}
          </q-card-title>
        </q-card-media>
      </q-card>
    </q-item>
    <q-item-separator />
    <q-card-title>Posts</q-card-title>
    <q-item>
      <q-card
        v-for="(post, index) in user.posts"
        :key="index"
        inline
        class="q-ma-sm"
      >
        <q-card-media>
          <q-parallax :src="post.img" :height="150">
            <div slot="loading">Loading...</div>
          </q-parallax>
          <q-card-title slot="overlay">
            {{ post.recipeName }}
          </q-card-title>
        </q-card-media>
      </q-card>
    </q-item>
    <q-item-separator />
    <q-card-title>Gallery</q-card-title>
    <gallery :gallery="gallery" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Gallery from '~/components/gallery'
export default {
  components: {
    Gallery
  },
  computed: {
    ...mapGetters({
      user: 'user/user',
      gallery: 'gallery/gallery'
    }),
    ...mapActions({
      signOut: 'auth/signOut'
    })
  },
  asyncData({ store }) {
    store.dispatch('user/get')
    store.dispatch('gallery/get')
  },
  methods: {
    editProfile() {
      this.$router.push({
        name: 'profile-edit',
        path: '/profile/edit',
        component: 'pages/profile/edit.vue'
      })
    }
  }
}
</script>

<style scoped>
.profile {
  bottom: 0px;
  left: 18px;
  transform: translateY(-50%);
  width: 100px;
  height: 100px;
  border-radius: 50%;
}
.coverPhoto {
  max-height: 300px;
}
.name {
  margin: 0;
  top: 0;
}
.q-card {
  width: 130px;
}
</style>
