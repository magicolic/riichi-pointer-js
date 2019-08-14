<template>
  <div>
    <div
      id="left-menu"
      :class="{ open: leftMenuIsOpen, close: !leftMenuIsOpen }"
    >
      <nav>
        <a
          href="#"
          @click="reset"
        >Reset</a>
      </nav>
      <a
        id="left-menu-slider"
        @click="toggleLeftMenu"
      ><span id="left-menu-slider-icon">{{ leftMenuIsOpen ? '&lt;' : '&gt;' }}</span></a>
    </div>

    <div id="layout">
      <div style="width: 100%;">
        <img
          src="img/logo.png"
          style="height: 40px; display: block; float: left; margin-right: 40px;"
        >
        <h1 style="font-size: 30px; line-height: 40px;">
          <span>{{ title }}</span>
        </h1>
        <div style="clear: both;" />
      </div>

      <div v-if="currentView === 'TileSelection'">
        <div style="margin-bottom: 20px">
          <input
            type="button"
            value="back to your hand"
            @click="closeTileSelection"
          >
        </div>

        <tile-selection-component
          :tiles="tilesAvailableForSelection"
          @selectTile="selectTile"
        />
      </div>

      <div v-if="currentView === 'Main'">
        <div style="margin: 10px 0;">
          <div style="float: left; width: 50%;">
            <fieldset>
              <legend>Winning type</legend>

              <div style="line-height: 14px; float: left; max-width: 30%; overflow: hidden; margin-right: 5%;">
                <span class="txt1">Winning By<br></span>
                <select
                  v-model="winningType"
                  style="width: 100%"
                >
                  <option value="tsumo">
                    Tsumo
                  </option>
                  <option value="ron">
                    Ron
                  </option>
                </select>
              </div>
            </fieldset>
          </div>

          <div style="float: left; width: 50%;">
            <fieldset>
              <legend>Winds</legend>

              <div style="line-height: 14px; float: left; max-width: 40%; overflow: hidden; margin-right: 5%;">
                <span class="txt1">Prevalent: <br></span>
                <select v-model="prevalentWind">
                  <option value="east">
                    East
                  </option>
                  <option value="south">
                    South
                  </option>
                  <option value="west">
                    West
                  </option>
                  <option value="north">
                    North
                  </option>
                </select>
              </div>

              <div style="line-height: 14px; float: left; max-width: 40%; overflow: hidden;">
                <span class="txt1">Seat: <br></span>
                <select v-model="seatWind">
                  <option value="east">
                    East
                  </option>
                  <option value="south">
                    South
                  </option>
                  <option value="west">
                    West
                  </option>
                  <option value="north">
                    North
                  </option>
                </select>
              </div>
            </fieldset>
          </div>

          <div style="clear: both;" />
        </div>

        <div style="margin: 10px 0;">
          <div style="float: left; width: 50%;">
            <fieldset>
              <legend>Dora</legend>
              <div style="margin-bottom: 10px;">
                <input
                  type="button"
                  value="+ Dora"
                  @click="addDora(false)"
                >
                <input
                  v-if="selectedDoraTiles.length > 0"
                  type="button"
                  value="- Dora"
                  @click="removeSelectedDoraTiles(false)"
                >
              </div>
              <div>
                <tile-component
                  v-for="(tile, index) in doraTiles"
                  :key="'dora.' + index"
                  :tile="tile"
                  :selected="selectedDoraTiles.indexOf(tile) > -1"
                  @click.native="toggleDoraTileSelection(tile, false)"
                />
              </div>
            </fieldset>
          </div>

          <div style="float: left; width: 50%;">
            <fieldset>
              <legend>Ura-Dora</legend>
              <div style="margin-bottom: 10px;">
                <input
                  type="button"
                  value="+ Ura-Dora"
                  @click="addDora(true)"
                >
                <input
                  v-if="selectedUraDoraTiles.length > 0"
                  type="button"
                  value="- Ura-Dora"
                  @click="removeSelectedDoraTiles(true)"
                >
              </div>
              <div>
                <tile-component
                  v-for="(tile, index) in uraDoraTiles"
                  :key="'uraDora.' + index"
                  :tile="tile"
                  :selected="selectedUraDoraTiles.indexOf(tile) > -1"
                  @click.native="toggleDoraTileSelection(tile, true)"
                />
              </div>
            </fieldset>
          </div>

          <div style="clear: both;" />
        </div>

        <div style="margin: 10px 0;">
          <fieldset>
            <legend>Concealed combinaisons</legend>
            <div>
              <input
                v-if="!handIsFinish"
                type="button"
                value="+ Pair"
                @click="addCombinaison(true, 'pair')"
              >
              <input
                v-if="!handIsFinish"
                type="button"
                value="+ Pon"
                @click="addCombinaison(true, 'pon')"
              >
              <input
                v-if="!handIsFinish"
                type="button"
                value="+ Kan"
                @click="addCombinaison(true, 'kan')"
              >
              <input
                v-if="!handIsFinish"
                type="button"
                value="+ Chii"
                @click="addCombinaison(true, 'chii')"
              >
              <input
                v-if="!handIsFinish"
                type="button"
                value="+ Orphan"
                @click="addCombinaison(true, 'orphan')"
              >
              <input
                v-if="selectedConcealedCombinaisons.length > 0"
                type="button"
                value="- Combinaison"
                @click="removeSelectedCombinaisons(true)"
              >
            </div>
            <div
              class="box-combinaison"
              style="margin-top: 10px;"
            >
              <combinaison-component
                v-for="(combinaison, index) in concealedCombinaisons"
                :key="'concealedCombinaisons.' + index"
                :combinaison="combinaison"
                :selected="selectedConcealedCombinaisons.indexOf(combinaison) > -1"
                @click.native="toggleCombinaisonSelection(combinaison, true)"
              />
            </div>
          </fieldset>
        </div>

        <div style="margin: 10px 0;">
          <fieldset>
            <legend>Open combinaisons</legend>
            <div>
              <input
                v-if="!handIsFinish"
                type="button"
                value="+ Pon"
                @click="addCombinaison(false, 'pon')"
              >
              <input
                v-if="!handIsFinish"
                type="button"
                value="+ Kan"
                @click="addCombinaison(false, 'kan')"
              >
              <input
                v-if="!handIsFinish"
                type="button"
                value="+ Chii"
                @click="addCombinaison(false, 'chii')"
              >
              <input
                v-if="selectedOpenCombinaisons.length > 0"
                type="button"
                value="- Combinaison"
                @click="removeSelectedCombinaisons(false)"
              >
            </div>
            <div
              class="box-combinaison"
              style="margin-top: 10px;"
            >
              <combinaison-component
                v-for="(combinaison, index) in openCombinaisons"
                :key="'openCombinaisons.' + index"
                :combinaison="combinaison"
                :selected="selectedOpenCombinaisons.indexOf(combinaison) > -1"
                @click.native="toggleCombinaisonSelection(combinaison, false)"
              />
            </div>
          </fieldset>
        </div>

        <div style="margin: 10px 0;">
          <fieldset>
            <legend>Waiting Tile</legend>
            <div style="margin-top: 10px;">
              <template v-for="(combinaison, combinaisonIndex) in concealedCombinaisons">
                <tile-component
                  v-for="(tile, tileIndex) in combinaison.tiles"
                  :key="'waitingTile.' + combinaisonIndex + '.' + tileIndex"
                  :tile="tile"
                  :selected="waitingTile === tile"
                  @click.native="toggleWaitingTile(tile)"
                />
              </template>
            </div>
          </fieldset>
        </div>

        <div style="margin: 10px 0;">
          <fieldset>
            <legend>Other</legend>

            <div style="float: left; width: 30%;">
              <span class="txt1">Riichi<br></span>
              <div>
                <select
                  v-model="riichiType"
                  style="margin-right: 5px;"
                >
                  <option />
                  <option value="normal">
                    Riichi
                  </option>
                  <option value="double">
                    Double Riichi
                  </option>
                </select>
                <label class="checkbox">
                  <input
                    v-model="riichiIsIppatsu"
                    type="checkbox"
                  >
                  Ippatsu
                </label>
              </div>
            </div>

            <div style="float: left; width: 30%;">
              <span class="txt1">Won on<br></span>
              <div>
                <label class="checkbox">
                  <input
                    v-model="wonDuringFirstUninterruptedRound"
                    type="checkbox"
                  >
                  First round
                </label>
              </div>
            </div>

            <div style="float: left; width: 30%;">
              <span class="txt1">Special Yaku<br></span>
              <select
                v-model="winningSecondaryType"
                style="width: 100%"
              >
                <option />
                <option value="haitei raoyue">
                  Haitei Raoyue
                </option>
                <option value="houtei raoyui">
                  Houtei Raoyui
                </option>
                <option value="rinshan kaihou">
                  Rinshan Kaihou
                </option>
                <option value="chan kan">
                  Chan Kan
                </option>
              </select>
            </div>

            <div style="clear: both;" />
          </fieldset>
        </div>

        <div>
          <input
            v-if="canCalculatePoint"
            type="button"
            value="Calculate hand points"
            @click="showPoints"
          >
        </div>
      </div>

      <div v-if="currentView === 'Result'">
        <div style="margin-bottom: 20px">
          <input
            type="button"
            value="back to your hand"
            @click="returnToMain"
          >
        </div>
        <div style="margin: 20px 0;">
          <score-component
            :hand="hand"
            :ruleset="ruleset"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.box-combinaison .combinaison {
  margin-right: 1.5vw;
}
.box-combinaison .combinaison:last-child {
  margin-right: 0;
}
</style>

<script>
import { Hand } from './core/hand-classes'
import { TileFactory, NumberedTile } from './core/tile-classes'
import { CombinaisonFactory } from './core/combinaison-classes'
import { DefaultRuleset } from './core/ruleset-classes'
import ScoreComponent from './components/Score.vue'
import TileComponent from './components/Tile.vue'
import CombinaisonComponent from './components/Combinaison.vue'
import TileSelectionComponent from './components/TileSelection.vue'

export default {
  components: {
    ScoreComponent,
    TileComponent,
    CombinaisonComponent,
    TileSelectionComponent
  },

  data () {
    return {
      title: 'Your hand', // Title of the current active view on the interface
      currentView: 'Main', // Id of the current active view on the interface (Main, TileSuitSelection, TileValueSelection, Result)
      prevalentWind: 'east', // name of the wind prevalent for the round (east, south, west, north)
      seatWind: 'east', // name of the wind of the player seat (east, south, west, north)
      winningType: 'tsumo', // indicate if the player won with a self-draw or discard (tsumo, ron)
      winningSecondaryType: '', // indicate if the player won with a particular circonstance (haitei raoyue, houtei raoyui, rinshan kaihou, chan kan)
      wonDuringFirstUninterruptedRound: false, // indicate if the player won during the his first uninterrupted (no open melds by any player) round
      riichiType: '', // indicate if the player won with riichi circonstance (riichi / double riichi)
      riichiIsIppatsu: false, // indicate if the player's riichi was ippatsu (won on the first round after declaring riichi)
      doraTiles: [], // list of the dora tiles
      selectedDoraTiles: [], // list of user selected dora tiles
      uraDoraTiles: [], // list of the ura-dora tiles
      selectedUraDoraTiles: [], // list of user selected ura-dora tiles
      waitingTile: null, // winning tile selected by the user
      concealedCombinaisons: [], // list of the concealed combinaisons of the player
      selectedConcealedCombinaisons: [], // list of user selected concealed combinaisons
      openCombinaisons: [], // list of the open combinaisons of the player
      selectedOpenCombinaisons: [], // list of user selected open combinaisons
      addForDora: null, // ndicate if the adding process is for dora or not (ex. : combinaison)
      addIsConcealed: null, // indicate if the combinaison that the user is currently adding is concealed or not
      addType: null, // type of the combinaison that the user is currently adding (pair, pon, kan, chii)
      addIsUraDora: null, // indicate if the dora that the user is currently adding is ura-dora or not
      leftMenuIsOpen: false,
      ruleset: new DefaultRuleset(),
      hand: null
    }
  },

  computed: {
    // computed property that indicate if the player hand is in a finish state (complete)
    handIsFinish () {
      const hand = new Hand(this.concealedCombinaisons, this.openCombinaisons)
      return hand.isFinish()
    },

    /** Computed property that indicate if the state of the hand is ready for point calculation */
    canCalculatePoint () {
      return this.handIsFinish && this.waitingTile !== null
    },

    /** Computed property to which tiles can be select by the user when showing the tile selection component */
    tilesAvailableForSelection () {
      let availableTiles = this.ruleset.getAvailableTiles()

      if (this.addType === 'chii') {
        // for chii selection, we want to remove honor tiles and the 8 and 9 numbered tiles from the selection available tiles
        availableTiles = availableTiles.filter(x => x instanceof NumberedTile)
        const highestNumber = Math.max(...availableTiles.map(x => x.number))
        availableTiles = availableTiles.filter(x => x.number <= highestNumber - 2)
      }

      return availableTiles
    }
  },

  methods: {
    reset () {
      this.title = 'Your hand'
      this.currentView = 'Main'
      this.prevalentWind = 'east'
      this.seatWind = 'east'
      this.winningType = 'tsumo'
      this.winningSecondaryType = ''
      this.wonDuringFirstUninterruptedRound = false
      this.riichiType = ''
      this.riichiIsIppatsu = false
      this.doraTiles = []
      this.selectedDoraTiles = []
      this.uraDoraTiles = []
      this.selectedUraDoraTiles = []
      this.waitingTile = null
      this.concealedCombinaisons = []
      this.selectedConcealedCombinaisons = []
      this.openCombinaisons = []
      this.selectedOpenCombinaisons = []
      this.addForDora = null
      this.addIsConcealed = null
      this.addType = null
      this.addIsUraDora = null
    },

    /**
     * action to begin the process of adding a new dora
     * this open the TileSelection view on the interface
     *
     * @param bool isUraDora indicate if the dora is an ura-dora (under the dora for riichi win)
     */
    addDora (isUraDora) {
      this.addForDora = true
      this.addIsUraDora = isUraDora
      this.currentView = 'TileSelection'
      this.title = 'Select a tile'
    },

    /**
      * action to select/unselect a dora
      *
      * @param {object} tile - The dora tile
      * @param {boolean} isUraDora - Flag indicating is the dora is an ura-dora (reverse dora) or not
      */
    toggleDoraTileSelection (tile, isUraDora) {
      const selectedTiles = isUraDora ? this.selectedUraDoraTiles : this.selectedDoraTiles
      const index = selectedTiles.indexOf(tile)
      if (index > -1) {
        selectedTiles.splice(index, 1)
      } else {
        selectedTiles.push(tile)
      }
    },

    /**
      * action to delete the selected dora
      *
      * @param {boolean} isUraDora - Flag indicating if we want to delete normal dora or ura-dora (reverse dora)
      */
    removeSelectedDoraTiles (isUraDora) {
      const selectedTiles = isUraDora ? this.selectedUraDoraTiles : this.selectedDoraTiles
      const tiles = isUraDora ? this.uraDoraTiles : this.doraTiles

      while (selectedTiles.length > 0) {
        const selectedTile = selectedTiles.pop()
        const index = tiles.indexOf(selectedTile)
        tiles.splice(index, 1)
      }
    },

    /**
     * action to begin the process of adding a new combinaison
     * this open the TileSelection view on the interface
     *
     * @param bool isConcealed indicate if the new combinaison will be concealed or not
     * @param string type specify the combinaison type that will be add (pair, pon, kan, chii)
     */
    addCombinaison (isConcealed, type) {
      this.addForDora = false
      this.addIsConcealed = isConcealed
      this.addType = type
      this.currentView = 'TileSelection'
      this.title = 'Select a tile'
    },

    /**
      * action to select/unselect an combinaison
      *
      * @param {object} combinaison - The combinaison
      * @param {boolean} isConcealed - Flag indicating if the combinaison is concealed or not (open)
      */
    toggleCombinaisonSelection (combinaison, isConcealed) {
      const selectedCombinaisons = isConcealed ? this.selectedConcealedCombinaisons : this.selectedOpenCombinaisons
      const index = selectedCombinaisons.indexOf(combinaison)

      if (index > -1) {
        selectedCombinaisons.splice(index, 1)
      } else {
        selectedCombinaisons.push(combinaison)
      }
    },

    /**
      * action to delete the selected combinaisons
      *
      * @param {boolean} isConcealed - Flag indicating if we want to delete concealed combinaisons or not (open)
      */
    removeSelectedCombinaisons (isConcealed) {
      const selectedCombinaisons = isConcealed ? this.selectedConcealedCombinaisons : this.selectedOpenCombinaisons
      const combinaisons = isConcealed ? this.concealedCombinaisons : this.openCombinaisons

      while (selectedCombinaisons.length > 0) {
        const selectedCombinaison = selectedCombinaisons.pop()
        const index = combinaisons.indexOf(selectedCombinaison)
        combinaisons.splice(index, 1)
      }
    },

    /**
     * action when the user select the tile value of the combinaison during the process of adding a new combinaison
     * this will finalize the adding process and return on the Main view on the interface
     *
     * @param {object} - object container the suit (dragon, wind, bamboo, dot or character) and the value (east, red, 1, etc...)
     */
    selectTile ({ suit, value }) {
      if (this.addForDora) {
        const tile = TileFactory.create(suit, value)
        if (this.addIsUraDora) {
          this.uraDoraTiles.push(tile)
        } else {
          this.doraTiles.push(tile)
        }
      } else {
        const firstCombinaisonTile = TileFactory.create(suit, value)
        const combinaison = CombinaisonFactory.create(this.addType, firstCombinaisonTile)

        if (this.addIsConcealed) {
          this.concealedCombinaisons.push(combinaison)
        } else {
          this.openCombinaisons.push(combinaison)
        }
      }

      this.closeTileSelection()
    },

    /**
     * action when the user want to close/cancel the tile selection view and return to the Main view on the interface
     */
    closeTileSelection () {
      this.addForDora = null
      this.addIsUraDora = null
      this.addType = null
      this.addIsConcealed = null
      this.returnToMain()
    },

    /**
     * action when the user select the winning tile
     *
     * @param object tile
     */
    toggleWaitingTile (tile) {
      if (this.waitingTile === tile) {
        this.waitingTile = null
      } else {
        this.waitingTile = tile
      }
    },

    /**
     * action when the user want to return to the Main view on the interface
     */
    returnToMain () {
      this.currentView = 'Main'
      this.title = 'Your hand'
    },

    /**
     * action when the user want to calculate the points of his hand
     * this will calculate the hand values
     * and this will open the Result view on the interface
    */
    showPoints () {
      const winningCombinaison = this.concealedCombinaisons.filter(x => x.tiles.indexOf(this.waitingTile) > -1)[0]

      const hand = new Hand(
        this.concealedCombinaisons,
        this.openCombinaisons,
        this.seatWind,
        this.prevalentWind,
        this.concealedCombinaisons.indexOf(winningCombinaison),
        winningCombinaison.tiles.indexOf(this.waitingTile),
        this.winningType,
        this.winningSecondaryType,
        this.doraTiles,
        this.uraDoraTiles
      )

      hand.wonDuringFirstUninterruptedRound = this.wonDuringFirstUninterruptedRound

      hand.isRiichi = this.riichiType !== ''
      hand.isDoubleRiichi = this.riichiType === 'double'
      hand.isIppatsu = this.riichiIsIppatsu

      this.hand = hand
      this.currentView = 'Result'
      this.title = 'Hand points'
    },

    toggleLeftMenu () {
      this.leftMenuIsOpen = !this.leftMenuIsOpen
    }
  }
}
</script>
