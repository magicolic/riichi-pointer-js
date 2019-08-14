<template>
  <div>
    <p>{{ summary }}</p>

    <p>
      <span v-if="yakuman.total > 0"><b>Yakuman:</b> <span>{{ yakuman.total }}</span> / </span>
      <b>Han:</b> <span>{{ yaku.total }}</span> / <b>Fu:</b> <span>{{ fu.total }}</span>
    </p>

    <div
      v-if="yakuman.total > 0"
      style="margin-bottom: 1em;"
    >
      <b>Yakuman details</b><br>
      <table>
        <thead>
          <tr>
            <th>Description</th>
            <th>Yakuman value</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(detail, index) in yakuman.details"
            :key="index"
          >
            <td>{{ detail.name }}</td>
            <td>{{ detail.value }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <b>Han details</b><br>
    <table>
      <thead>
        <tr>
          <th>Description</th>
          <th>Han value</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(detail, index) in yaku.details"
          :key="index"
        >
          <td>{{ detail.name }}</td>
          <td>{{ detail.value }}</td>
        </tr>
      </tbody>
    </table>

    <br><b>Fu details</b><br>
    <table>
      <thead>
        <tr>
          <th>Description</th>
          <th>Fu value</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(detail, index) in fu.details"
          :key="index"
        >
          <td>{{ detail.name }}</td>
          <td>{{ detail.value }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { calculateFu, calculatePoint } from '@/core/pointer-classes'
import { Hand } from '@/core/hand-classes'
import { Ruleset } from '@/core/ruleset-classes'

export default {
  name: 'ScoreComponent',

  props: {
    hand: {
      type: Hand,
      required: true
    },
    ruleset: {
      type: Ruleset,
      required: true
    }
  },

  computed: {
    yaku () {
      const patterns = this.ruleset.getYakuPatterns()

      const yaku = patterns.reduce((agg, x) => {
        const checkResult = x.check(this.hand)
        if (checkResult > 0) {
          agg.total += checkResult
          agg.details.push({ value: checkResult, name: `${x.japaneseName} (${x.englishName})` })
        }
        return agg
      }, { total: 0, details: [] })

      return yaku
    },

    yakuman () {
      const patterns = this.ruleset.getYakumanPatterns()

      return patterns.reduce((agg, x) => {
        const checkResult = x.check(this.hand)
        if (checkResult > 0) {
          agg.total += checkResult
          agg.details.push({ value: checkResult, name: `${x.japaneseName} (${x.englishName})` })
        }
        return agg
      }, { total: 0, details: [] })
    },

    fu () {
      return calculateFu(this.hand)
    },

    summary () {
      const pointResult = calculatePoint(this.hand, this.yaku.total, this.fu.total, this.yakuman.total)
      let summary = ''
      if (this.hand.seatWind === 'east') { // dealer
        if (this.hand.winningType === 'tsumo') {
          summary = pointResult + ' points from each player (' + (pointResult * 3) + ' points)'
        } else if (this.hand.winningType === 'ron') {
          summary = pointResult + ' points from the discard player'
        }
      } else { // non-dealer
        if (this.hand.winningType === 'tsumo') {
          summary = pointResult.dealer + ' points from dealer / ' + pointResult.nonDealer + ' points from others players (' + (pointResult.dealer + (pointResult.nonDealer * 2)) + ' points)'
        } else if (this.hand.winningType === 'ron') {
          summary = pointResult + ' points from the discard player'
        }
      }
      return summary
    }
  }
}
</script>
