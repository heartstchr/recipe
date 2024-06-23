<template>
  <div class="bg-grey-8 text-white">
    <q-toolbar>
      <div class="row col-12">
        <div class="col-12 col-md-2"></div>
        <div
          v-for="(items, key) in bottomFooterMenu"
          :key="key"
          class="col-12 col-md-3"
        >
          <q-item-main class="text-weight-bolder q-my-sm text-h1">
            {{ items.title }}
          </q-item-main>
          <div v-for="(item, innerKey) in items.subMenu" :key="innerKey">
            <nuxt-link :to="item.route" class="text-white">
              {{ item.title }}
            </nuxt-link>
          </div>
        </div>
        <div class="col-12 col-md-1"></div>
      </div>
    </q-toolbar>
    <q-toolbar color="grey" class="justify-center">
      <div class="row">
        {{ copyRight }}
      </div>
    </q-toolbar>
  </div>
</template>

<script>
export default {
  name: 'FooterTabs',
  props: {
    bottomFooterMenu: {
      type: Array
    }
  },
  data() {
    return {
      copyRight: 'Copyright@2019'
    }
  }
}
</script>
<style scoped>
.text-h1 {
  font-size: x-large;
}
.q-toolbar {
  min-height: 20px;
}
</style>
