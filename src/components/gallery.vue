<template>
  <div class="row col-12">
    <div
      v-for="(gal, innerKey) in gallery"
      :key="innerKey"
      class="col-12 col-md-6"
    >
      <q-card-title>{{ gal.name }}</q-card-title>
      <q-card class="row">
        <div v-for="(item, key) in gal.items" :key="key" :class="item.class">
          <div v-if="item.type === 'img'" class="q-ma-xs">
            <q-parallax style="height:200px">
              <img slot="media" :src="item.src" />
            </q-parallax>
          </div>
          <div v-else-if="item.type === 'video'" class="q-ma-xs">
            <q-parallax style="height:200px">
              <div class="q-video">
                <iframe
                  src="https://www.youtube.com/watch?v=hjGX0vsBaV0"
                  frameborder="0"
                  allowfullscreen
                ></iframe>
              </div>
            </q-parallax>
          </div>
        </div>
      </q-card>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    gallery: {
      type: Array
    }
  }
}
</script>

<style scoped>
.q-video {
  width: 100%;
  height: 100%;
}
</style>
