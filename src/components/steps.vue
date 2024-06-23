<template>
  <q-timeline responsive color="primary" style="padding: 0 24px;">
    <q-timeline-entry heading>
      Steps to make {{ recipeItem.title }}
    </q-timeline-entry>

    <q-timeline-entry
      v-for="step in recipeItem.steps"
      :key="step.name"
      :title="step.name"
      :subtitle="step.time"
      :side="step.side"
      :icon="step.icon"
    >
      <div>
        {{ step.content }}
        <q-card-media>
          <q-parallax :src="step.img" :height="300">
            <div slot="loading">Loading...</div>
          </q-parallax>
        </q-card-media>
      </div>
    </q-timeline-entry>
  </q-timeline>
</template>

<script>
export default {
  props: {
    recipeItem: Object
  }
}
</script>

<style>
.container {
  margin: 0 auto;
}
</style>
