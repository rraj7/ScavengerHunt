<template>
  <div>
    <v-card v-for="(loc, index) in visited" :key="index">
      <v-card-text>
        <location-card-text v-bind="loc"></location-card-text>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import LocationCardText from "./LocationCardText";

export default {
  name: "VisitedLocations",
  components: { LocationCardText },
  computed: {
    ...mapGetters({ visited: "getVisited" })
  }
};
</script>

<style scoped></style>
