<template>
  <div>
    <q-input
      v-model="tickFilter"
      :before="[{ icon: 'filter_list', handler() {} }]"
      float-label="Filter Ingredients"
      class="q-ma-none"
      clearable
    />
    <q-tree
      :nodes="tickable"
      color="primary"
      control-color="primary"
      default-expand-all
      icon-color="primary"
      :ticked.sync="ticked"
      :filter="tickFilter"
      node-key="label"
    >
      <div slot="header-root" slot-scope="data" class="row items-center">
        <q-icon
          :name="data.node.icon"
          color="orange"
          size="28px"
          class="q-mr-sm"
        />
        <div>
          {{ data.node.label }}
          <q-btn label="Buy All" />
        </div>
      </div>
      <div slot="body-link" slot-scope="data">
        <q-btn
          tag="a"
          label="Buy Now"
          target="_blank"
          @click="$router.forward(data.node.link)"
        />
      </div>
    </q-tree>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ticked: [],
      tickFilter: null
    }
  },
  computed: {
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
  }
}
</script>

<style>
.container {
  margin: 0 auto;
}
</style>
