<template>
  <div :class="{ combinaison, 'combinaison--selected': selected }">
    <tile-component
      v-for="(tile, index) in combinaison.tiles"
      :key="index"
      :tile="tile"
    />
  </div>
</template>

<style>
  .combinaison {
    display: inline-block;
  }
  .combinaison--selected {
    opacity: 0.5;
  }
</style>

<script>
import { Combinaison } from '@/core/combinaison-classes'
import TileComponent from '@/components/Tile.vue'

export default {
  name: 'CombinaisonComponent',

  components: {
    TileComponent
  },

  props: {
    combinaison: {
      type: Combinaison,
      required: true
    },
    selected: {
      type: Boolean,
      require: false,
      default: false
    }
  }
}
</script>
