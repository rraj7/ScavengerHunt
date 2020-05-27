<template>
  <GmapMap
    id="map"
    :center="playerPosition"
    :zoom="16"
    :options="{
      minZoom: 18,
      maxZoom: 20,
      zoomControl: false,
      streetViewControl: false,
      clickableIcons: false,
      styles: [
        {
          featureType: 'poi',
          stylers: [{ visibility: 'off' }]
        }
      ]
    }"
    map-type-id="roadmap"
    style="width: 100%; height: 300px"
  >
    <!--    <GmapMarker-->
    <!--      :position="playerPosition"-->
    <!--      :icon="{-->
    <!--        url: require('../assets/my_location-24px.svg'),-->
    <!--        scaledSize: { width: 15, height: 15 }-->
    <!--      }"-->
    <!--      :size="5"-->
    <!--      clickable-->
    <!--      @click="dialog = !dialog"-->
    <!--    >-->
    <!--    </GmapMarker>-->
    <GmapCircle
      :center="playerPosition"
      :radius="10"
      :options="{
        strokeColor: '#03b2ff',
        strokeOpacity: 0.5,
        fillOpacity: 0.2
      }"
    ></GmapCircle>

    <GmapCircle
      :center="playerPosition"
      :radius="2"
      :options="{
        strokeOpacity: 0,
        fillColor: '#03b2ff',
        fillOpacity: 0.9
      }"
    ></GmapCircle>

    <GmapMarker
      v-for="(location, index) in locations"
      :key="index"
      :position="{ lat: location.lat, lng: location.lon }"
      :title="location.name"
      clickable
      @click="selectLocation(location)"
    ></GmapMarker>

    <v-dialog v-model="dialog" width="500">
      <v-card>
        <v-card-text class="mx-auto">
          <location-card-text v-bind="selectedLocation"></location-card-text>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-btn :disabled="!enableVisitButton" @click="visit()">Visit</v-btn>
          <div class="flex-grow-1"></div>
          <v-btn color="primary" text @click="dialog = false">OK</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </GmapMap>
</template>

<script>
import LocationCardText from "./LocationCardText";
import { mapGetters } from "vuex";
import haversine from "haversine";

let timerHandle;
const cleanupGeoTimer = err => {
  if (err) console.error(err); //eslint-disable-line no-console
  clearInterval(timerHandle);
};

export default {
  name: "ScavengerMap",
  components: { LocationCardText },
  data: () => {
    return {
      playerPosition: {
        lat: 10,
        lng: 10
      },
      dialog: false,
      selectedLocation: null
    };
  },
  mounted() {
    this.$store.dispatch("updateLocations");
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        this.updatePosition,
        cleanupGeoTimer
      );
      timerHandle = setInterval(
        () =>
          navigator.geolocation.getCurrentPosition(
            this.updatePosition,
            cleanupGeoTimer
          ),
        1000
      );
    } else {
      alert("Your device does not support geolocation services.");
    }
  },
  beforeDestroy() {
    cleanupGeoTimer();
  },
  methods: {
    updatePosition(position) {
      this.playerPosition.lat = position.coords.latitude;
      this.playerPosition.lng = position.coords.longitude;
    },
    selectLocation(loc) {
      this.selectedLocation = loc;
      this.dialog = true;
    },
    visit() {
      this.$store.commit("markVisited", this.selectedLocation);
      this.dialog = false;
      //this.$router.push("visited");
    }
  },
  computed: {
    ...mapGetters({ locations: "getMyLocations" }),
    enableVisitButton: function() {
      if (!this.selectedLocation || !this.playerPosition) return false;
      console.log("finding haversine");

      let dist = haversine(
        {
          latitude: this.playerPosition.lat,
          longitude: this.playerPosition.lng
        },
        {
          latitude: this.selectedLocation.lat,
          longitude: this.selectedLocation.lon
        },
        {
          unit: "meter"
        }
      );
      console.log(dist);
      return dist < 10;
    }
  }
};
</script>

<style scoped>
#map {
  height: 100%;
  width: 100%;
}
</style>
