<template>
  <q-layout-drawer
    v-model="rightD"
    side="right"
    :content-class="$q.theme === 'mat' ? 'bg-grey-3' : null"
    :content-style="{ fontSize: '16px' }"
    @input="drawerClick"
  >
    <q-list-header class="removePadding">
      <q-card-media>
        <img :src="user.coverPhoto" />
      </q-card-media>
      <q-item v-for="(item, key) in rightMenu" :key="key" :to="item.route">
        <q-item-side :icon="item.icon" color="primary" />
        <q-item-main :label="item.title" />
        <!-- <q-item-side right icon="thumb_up" /> -->
      </q-item>
    </q-list-header>
  </q-layout-drawer>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const mapUserGetters = createNamespacedHelpers('user').mapGetters
const mapMenuGetters = createNamespacedHelpers('menu').mapGetters
export default {
  name: 'RightNav',
  props: {
    rightDrawer: {
      type: Boolean
    }
  },
  data() {
    return {
      rightD: this.rightDrawer
    }
  },
  computed: {
    ...mapUserGetters(['user']),
    ...mapMenuGetters(['rightMenu'])
  },
  watch: {
    rightDrawer: function(val) {
      this.rightD = val
    }
  },
  created() {
    this.$store.dispatch('user/get')
  },
  methods: {
    drawerClick() {
      this.$emit('toggle-drawer', 'right')
    }
  }
}
</script>
