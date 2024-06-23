<template>
  <div>
    <q-carousel
      v-model="slide"
      swipeable
      animated
      arrows
      infinite
      autoplay
      transition-prev="slide-right"
      transition-next="slide-left"
      :fullscreen.sync="fullscreen"
    >
      <q-carousel-slide
        v-for="(carousel, number) in recipeItem.carousels"
        :key="number"
        :name="carousel.name"
        :img-src="carousel.image"
      />
    </q-carousel>
    <q-card-title>
      <q-rating
        slot="subtitle"
        v-model="recipeItem.stars"
        color="amber"
        :max="5"
      />
      <div slot="right" class="row items-center">
        <q-icon name="share" /> 250
      </div>
    </q-card-title>
    <q-card-main>
      <q-item-tile label>
        {{ recipeItem.title }}
      </q-item-tile>
      <q-item-tile sublabel>
        {{ recipeItem.subTitle }}
      </q-item-tile>
      <br />
      <p class="text-faded">
        {{ recipeItem.desc }}
      </p>
    </q-card-main>
    <q-card-separator />
    <q-tabs animated swipeable inverted color="primary" align="justify">
      <q-tab
        slot="title"
        default
        name="direction"
        icon="timeline"
        label="Direction"
      />
      <q-tab
        slot="title"
        name="ingredients"
        icon="art_track"
        label="Ingredients"
      />

      <q-tab-pane name="direction">
        <steps :recipe-item="recipeItem" />
      </q-tab-pane>
      <q-tab-pane name="ingredients">
        <ingredients :tickable="tickable" />
      </q-tab-pane>
    </q-tabs>
    <q-card-actions>
      <q-btn color="primary" label="Back" right @click="$router.back()" />
    </q-card-actions>
  </div>
</template>

<script>
import { scroll } from 'quasar'
import Ingredients from '~/components/ingredients'
import Steps from '~/components/steps'
export default {
  components: {
    Ingredients,
    Steps
  },
  validate({ params }) {
    console.log(params, this.$route.params)
  },
  data() {
    return {
      slide: 1,
      fullscreen: true
    }
  },
  computed: {
    recipeItem: function() {
      return this.$store.getters['recipes/items'].filter(ele => {
        return ele.id == this.$route.params.id
      })[0]
    },
    tickable: function() {
      return [
        {
          label: 'Required Ingradients',
          tickStrategy: 'leaf',
          header: 'root',
          icon: 'shopping_cart',
          children: this.$store.getters['ingredients/items']
        }
      ]
    }
  },
  beforeMount() {
    this.$store.dispatch('recipes/get')
    this.$store.dispatch('ingredients/get')
    this.handleScroll()
  },
  methods: {
    handleScroll() {
      const { getScrollTarget, setScrollPosition } = scroll
      this.shown = false
      const ele = document.getElementById('top')
      const target = getScrollTarget(ele)
      const offset = ele.offsetTop - ele.scrollHeight
      setScrollPosition(target, offset, 1000)
    }
  }
}
</script>

<style>
.container {
  margin: 0 auto;
}
.fixed-top {
  z-index: 1;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2), 0 2px 2px rgba(0, 0, 0, 0.14),
    0 3px 1px -2px rgba(0, 0, 0, 0.12);
}
.q-card-media-overlay {
  background: rgba(2, 3, 142, 0.47);
}
.q-carousel {
  height: 200px;
}
.q-carousel-inner {
  height: 380px !important;
}
.q-ma-sm {
  width: -webkit-fill-available;
}
</style>
