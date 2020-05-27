<template>
  <div>
    <v-expansion-panels popout>
      <v-expansion-panel v-for="(game, index) in games" :key="index">
        <v-expansion-panel-header class="headline">
          {{ game.name }}
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-divider></v-divider>
          <br />
          Status: {{ game.active ? "Active" : "Inactive" }} <br /><br />
          Required Landmarks
          <v-list>
            <v-list-item
              v-for="(location, index) in getLocationsFromId(game.locations)"
              :key="index"
            >
              <v-list-item-content>
                <v-list-item-title>{{ location.name }}</v-list-item-title>
                <v-list-item-subtitle>{{
                  location.description
                }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
          Created By {{ game.created_by }}<br /><br /><v-divider></v-divider
          ><br />
          <v-btn
            color="blue darker"
            text
            rounded
            outlined
            @click="editGame(game.game_id)"
          >
            Edit
          </v-btn>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
    <br />
    <v-btn block text rounded color="blue darker" @click="displayNew">
      + New
    </v-btn>

    <v-dialog v-model="showEdit" width="500" persistent>
      <v-card>
        <v-card-title class="headline primary darken-2" primary-title>
          Edit Game
        </v-card-title>

        <v-card-text>
          <br />
          <v-form ref="form" v-if="selectedGame !== null">
            <v-text-field
              outlined
              v-model="selectedGame.name"
              label="Name"
              required
            ></v-text-field>
            <v-switch
              v-model="selectedGame.active"
              label="Active"
              inset
            ></v-switch>
            <span>Locations</span>

            <v-checkbox
              v-for="(location, index) in locations"
              :key="index"
              v-model="selectedGame.locations"
              :label="location.name"
              :value="location.id"
            ></v-checkbox>
          </v-form>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darker" text @click="cancelEdit">Cancel</v-btn>
          <v-btn color="primary" text @click="commitEdit">
            OK
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="showNew" width="500" persistent>
      <v-card>
        <v-card-title class="headline primary darken-2" primary-title>
          Create Game
        </v-card-title>

        <v-card-text>
          <br />
          <v-form ref="form" v-if="selectedGame !== null">
            <v-text-field
              outlined
              v-model="selectedGame.name"
              label="Name"
              required
            ></v-text-field>
            <v-switch
              v-model="selectedGame.active"
              label="Active"
              inset
            ></v-switch>
            <span>Locations</span>

            <v-checkbox
              v-for="(location, index) in locations"
              :key="index"
              v-model="selectedGame.locations"
              :label="location.name"
              :value="location.id"
            ></v-checkbox>
          </v-form>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darker" text @click="cancelEdit">Cancel</v-btn>
          <v-btn color="primary" text @click="newGame">
            Create
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "AllGames",
  data: () => ({
    selectedGame: {},
    showEdit: false,
    showNew: false
  }),
  methods: {
    ...mapActions(["alterGame", "createGame"]),
    editGame: function(game_id) {
      let game = this.games.filter(x => x.game_id === game_id)[0];
      this.selectedGame = JSON.parse(JSON.stringify(game));
      this.showEdit = true;
    },
    cancelEdit: function() {
      this.selectedGame = {};
      this.showEdit = false;
      this.showNew = false;
    },
    commitEdit: function() {
      this.alterGame({
        game: JSON.parse(JSON.stringify(this.selectedGame))
      });
      this.selectedGame = null;
      this.showEdit = false;
    },
    displayNew: function() {
      this.selectedGame = {
        name: "",
        active: false,
        locations: []
      };
      this.showNew = true;
    },
    newGame: function() {
      console.log(this.selectedGame);
      this.createGame({
        game: JSON.parse(JSON.stringify(this.selectedGame))
      });
      this.selectedGame = null;
      this.showNew = false;
    }
  },
  computed: {
    ...mapGetters({ games: "getAllGames", locations: "getLocations" }),
    getLocationsFromId() {
      return locations => {
        return this.locations.filter(x => locations.includes(x.id));
      };
    }
  }
};
</script>

<style scoped></style>
