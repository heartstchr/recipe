<template>
  <div>
    <q-page-sticky v-if="shown" position="bottom-right" :offset="[18, 38]">
      <q-btn
        ref="scrollTop"
        fab-mini
        color="secondary"
        icon="keyboard_arrow_up"
        class="absolute"
        size="12px"
        style="right: 8px; transform: translateY(-50%);"
        @click="handleScroll()"
      />
    </q-page-sticky>
    <q-tabs class="shadow-2" align="justify" inverted>
      <q-route-tab
        v-for="(item, key) in easyMenu"
        slot="title"
        :key="key"
        :icon="item.icon"
        :to="item.route"
        replace
      />
    </q-tabs>
  </div>
</template>

<script>
import { scroll } from 'quasar'
const { getScrollTarget, setScrollPosition } = scroll

export default {
  name: 'FooterTabs',
  props: {
    easyMenu: {
      type: Array
    }
  },
  data() {
    return {
      shown: false
    }
  },
  created() {
    window.addEventListener('scroll', this.showBotton)
  },
  methods: {
    handleScroll() {
      this.shown = false
      const ele = document.getElementById('top')
      const target = getScrollTarget(ele)
      const offset = ele.offsetTop - ele.scrollHeight
      setScrollPosition(target, offset, 1000)
    },
    showBotton() {
      if (window.scrollY > 1000) {
        this.shown = true
      } else {
        this.shown = false
      }
    }
  }
}
</script>
