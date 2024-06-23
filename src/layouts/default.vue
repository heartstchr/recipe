<template>
  <q-layout view="hHh Lpr lFr" class="shadow-2">
    <q-layout-header reveal elevated class="bg-primary text-white">
      <q-page-sticky expand position="top">
        <q-toolbar>
          <q-btn
            v-if="isAuthenticated"
            dense
            flat
            round
            icon="menu"
            @click="toggleDrawer('left')"
          />
          <q-toolbar-title>
            {{ title }}
          </q-toolbar-title>
          <q-btn
            v-if="isAuthenticated"
            flat
            round
            dense
            icon="person_outline"
            @click="toggleDrawer('right')"
          />
        </q-toolbar>
      </q-page-sticky>
    </q-layout-header>

    <left-nav
      v-if="isAuthenticated"
      :left-drawer="left"
      @toggle-drawer="toggleDrawer"
    />
    <right-nav
      v-if="isAuthenticated"
      :right-drawer="right"
      @toggle-drawer="toggleDrawer"
    />

    <q-page-container id="top" style="padding-top: 66px">
      <router-view />
    </q-page-container>

    <q-page-container v-if="isAuthenticated">
      <bottom-footer :bottom-footer-menu="footerMenu" />
    </q-page-container>
    <q-layout-footer v-if="isAuthenticated" elevated reveal>
      <footer-tabs :easy-menu="easyMenu" />
    </q-layout-footer>
  </q-layout>
</template>
<script>
import { mapGetters } from 'vuex'
import FooterTabs from '~/components/layout/footer-tabs'
import BottomFooter from '~/components/layout/bottom-footer'
import LeftNav from '~/components/layout/left-nav'
import RightNav from '~/components/layout/right-nav'
export default {
  components: {
    LeftNav,
    RightNav,
    FooterTabs,
    BottomFooter
  },
  data() {
    return {
      title: 'Recipe'
    }
  },
  computed: {
    ...mapGetters({
      isAuthenticated: 'auth/isAuthenticated',
      left: 'menu/left',
      right: 'menu/right',
      rightMenu: 'menu/rightMenu',
      easyMenu: 'menu/easyMenu',
      footerMenu: 'menu/footerMenu'
    })
  },
  created() {
    this.$store.dispatch('menu/get')
  },
  methods: {
    toggleDrawer(data) {
      this.$store.dispatch('menu/toggleDrawer', data)
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
.removePadding {
  padding: 0;
}
.margin {
  margin: 10px;
}
.noMargin {
  margin: 0 10px;
}
.q-layout-page-container {
  padding-top: 50px !important;
}
</style>
