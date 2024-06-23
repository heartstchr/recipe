<template>
  <q-layout-drawer
    v-model="leftD"
    side="left"
    :content-class="$q.theme === 'mat' ? 'bg-grey-3' : null"
    @input="drawerClick"
  >
    <q-card-media>
      <q-list-header>Recipes</q-list-header>
    </q-card-media>
    <q-item v-for="(item, key) in leftMenu" :key="key" :to="item.route">
      <q-item-side :icon="item.icon" color="primary" />
      <q-item-main :label="item.title" :sublabel="item.subtitle" />
      <!-- <q-item-side right icon="thumb_up" /> -->
    </q-item>
  </q-layout-drawer>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const mapUserGetters = createNamespacedHelpers('user').mapGetters
const mapMenuGetters = createNamespacedHelpers('menu').mapGetters
export default {
  name: 'LeftNav',
  props: {
    leftDrawer: {
      type: Boolean
    }
  },
  data() {
    return {
      leftD: this.leftDrawer
    }
  },
  computed: {
    ...mapUserGetters(['user']),
    ...mapMenuGetters(['leftMenu'])
  },
  watch: {
    leftDrawer: function(val) {
      this.leftD = val
    }
  },
  methods: {
    drawerClick() {
      this.$emit('toggle-drawer', 'left')
    }
  }
}
</script>
