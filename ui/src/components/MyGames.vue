<template>
  <div>
    <span class="headline">Active Games</span>
    <v-divider></v-divider>
    <br />
    <v-expansion-panels inset multiple focusable>
      <v-expansion-panel v-for="(game, index) in activeGames" :key="index">
        <v-expansion-panel-header>
          <div>
            <v-progress-circular
              :rotate="-90"
              :value="
                (getLocations(game.game_id).length / game.locations.length) *
                  100
              "
              color="green darken"
            >
            </v-progress-circular>
            &nbsp;&nbsp;{{ game.name }}
          </div>
        </v-expansion-panel-header>

        <v-expansion-panel-content>
          <v-list rounded>
            <v-list-item
              v-for="(location, index) in getGameLocations(game.game_id)"
              :key="index"
              @click="
                getLocations(game.game_id).some(x => x.id === location.id)
                  ? setLocation(location.id)
                  : null
              "
              :disabled="
                !getLocations(game.game_id).some(x => x.id === location.id)
              "
            >
              <v-list-item-icon>
                <v-icon
                  v-if="
                    getLocations(game.game_id).some(x => x.id === location.id)
                  "
                  color="green darken"
                  >mdi-check
                </v-icon>
                <v-icon v-else color="red darken">mdi-close</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                {{ location.name }}
              </v-list-item-content>
            </v-list-item>
          </v-list>
          <v-btn
            block
            color="red darker"
            rounded
            outlined
            @click="leaveGame({ id: game.game_id })"
            >Leave</v-btn
          >
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>

    <br />
    <span class="headline">Stale Games</span>
    <v-divider></v-divider>
    <br />

    <v-expansion-panels inset multiple focusable>
      <v-expansion-panel v-for="(game, index) in inactiveGames" :key="index">
        <v-expansion-panel-header>
          <div>
            <v-progress-circular
              :rotate="-90"
              :value="
                (getLocations(game.game_id).length / game.locations.length) *
                  100
              "
              color="green darken"
            >
            </v-progress-circular>
            &nbsp;&nbsp;{{ game.name }}
          </div>
        </v-expansion-panel-header>

        <v-expansion-panel-content>
          <v-list rounded>
            <v-list-item
              v-for="(location, index) in getGameLocations(game.game_id)"
              :key="index"
              @click="
                getLocations(game.game_id).some(x => x.id === location.id)
                  ? setLocation(location.id)
                  : null
              "
              :disabled="
                !getLocations(game.game_id).some(x => x.id === location.id)
              "
            >
              <v-list-item-icon>
                <v-icon
                  v-if="
                    getLocations(game.game_id).some(x => x.id === location.id)
                  "
                  color="green darken"
                  >mdi-check
                </v-icon>
                <v-icon v-else color="red darken">mdi-close</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                {{ location.name }}
              </v-list-item-content>
            </v-list-item>
          </v-list>
          <v-btn
            block
            color="red darker"
            rounded
            outlined
            @click="leaveGame({ id: game.game_id })"
            >Leave</v-btn
          >
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>

    <br />
    <games></games>

    <v-dialog v-model="showInfo" width="500">
      <v-card>
        <v-card-title class="headline primary darken-2" primary-title>
          {{ selectedLocation.name }}
        </v-card-title>

        <v-card-text>
          <br />
          {{ selectedLocation.description }}
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="showInfo = false">
            OK
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Games from "./Games";

export default {
  name: "MyGames",
  components: { Games },
  data: () => ({
    selectedLocation: {},
    showInfo: false
  }),
  methods: {
    ...mapActions(["leaveGame"]),
    getGameLocations: function(game_id) {
      return this.$store.getters.getGameLocations(game_id);
    },
    setLocation: function(location_id) {
      this.selectedLocation = this.$store.getters.getLocation(location_id);
      console.log(location_id);
      console.log(this.selectedLocation);
      this.showInfo = true;
    }
  },
  computed: {
    ...mapGetters({
      games: "getMyGames",
      getLocations: "getVisitedGameLocations"
    }),
    activeGames() {
      console.log(this.games);
      return this.games.filter(x => x.active);
    },
    inactiveGames() {
      return this.games.filter(x => !x.active);
    }
  }
};
</script>

<style scoped></style>
