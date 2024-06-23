<template>
  <q-pull-to-refresh :handler="refresher">
    <q-page class="card-examples items-start">
      <h4 class="noMargin">
        Recipes
      </h4>
      <q-search
        v-model="modal"
        icon="local_dining"
        inverted-light
        class="margin"
        color="#adadad2b"
        float-label="Search for a recipe"
      />
      <div v-if="totalRecipes">
        <recipe :total-recipes="totalRecipes" :recipes="items" />
      </div>
      <div v-else>
        <no-recipe />
      </div>
    </q-page>
  </q-pull-to-refresh>
</template>

<script>
import { mapGetters } from 'vuex'
import Recipe from '~/components/recipe'
import noRecipe from '~/components/no-recipe'
export default {
  components: {
    Recipe,
    noRecipe
  },
  data() {
    return {
      modal: ''
    }
  },
  computed: {
    ...mapGetters({
      items: 'recipes/items',
      totalRecipes: 'recipes/totalRecipes'
    })
  },
  asyncData({ store }) {
    store.dispatch('recipes/get')
    store.dispatch('ingredients/get')
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
  }
}
</script>

<style></style>
