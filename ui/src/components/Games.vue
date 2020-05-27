<template>
  <div>
    <span class="headline">Available Games</span>
    <v-divider></v-divider>
    <br />
    <v-list rounded>
      <div v-for="(game, index) in games" :key="index">
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>{{ game.name }}</v-list-item-title>
            <v-list-item-subtitle>
              Created by {{ game.created_by }}
            </v-list-item-subtitle>
            <v-list-item-subtitle>
              <span v-if="game.active">
                In Progress...
              </span>

              <span v-else>
                Not Started
              </span>
            </v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action>
            <v-btn
              color="primary"
              rounded
              outlined
              @click="joinGame({ id: game.game_id })"
            >
              + Join
            </v-btn>
          </v-list-item-action>
        </v-list-item>
        <v-divider v-if="index !== games.length - 1"></v-divider>
      </div>
    </v-list>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Games",
  computed: {
    ...mapGetters({ games: "getAvailableGames" })
  },
  methods: {
    ...mapActions(["joinGame"])
  }
};
</script>

<style scoped></style>
