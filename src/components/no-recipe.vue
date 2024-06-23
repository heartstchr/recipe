<template>
  <div class="row q-ma-xs">
    <q-card class="q-ma-xs noRecipe">
      <q-item-main class="q-pa-md">
        <q-item-tile label class="text-center">
          Please add recipe
        </q-item-tile>
        <q-item-tile sublabel class="text-center">
          No recipe found
        </q-item-tile>
      </q-item-main>
      <q-item-main class="text-center">
        <q-icon name="local_dining" class="big"></q-icon>
      </q-item-main>
      <q-card-separator inset />
      <q-card-actions vertical class="col-md-5">
        <q-btn flat color="primary" label="Add Recipe" @click="addRecipe()" />
      </q-card-actions>
    </q-card>
  </div>
</template>

<script>
export default {
  methods: {
    addRecipe() {
      this.$router.push({
        name: 'recipe-add',
        path: '/recipe/add',
        component: 'pages/recipe/add.vue'
      })
    }
  }
}
</script>

<style>
.big {
  font-size: 350px;
  color: #63adec69;
}
.noRecipe {
  width: 100%;
}
</style>
