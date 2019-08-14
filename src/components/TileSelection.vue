<template>
  <div>
    <div
      v-for="(suit, suitIndex) in tilesGroupedBySuit"
      :key="suitIndex"
    >
      <tile-component
        v-for="(tile, tileIndex) in suit.tiles"
        :key="suitIndex + '.' + tileIndex"
        :tile="tile"
        @click.native="selectTile(tile.suit, tile.value)"
      />
    </div>
  </div>
</template>

<script>
import TileComponent from '@/components/Tile.vue'

export default {
  name: 'TileSelectionComponent',

  components: {
    TileComponent
  },

  props: {
    tiles: {
      type: Array,
      required: true
    }
  },

  computed: {
    tilesGroupedBySuit () {
      return this.tiles.reduce((agg, tile) => {
        const suitIndex = agg.findIndex(x => x.suit === tile.suit)

        if (suitIndex > -1) {
          agg[suitIndex].tiles.push(tile)
        } else {
          agg.push({ suit: tile.suit, tiles: [tile] })
        }

        return agg
      }, [])
    }
  },

  methods: {
    selectTile (suit, value) {
      this.$emit('selectTile', { suit, value })
    }
  }
}
</script>
