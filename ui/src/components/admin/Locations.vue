<template>
  <div>
    <v-expansion-panels popout>
      <v-expansion-panel v-for="(location, index) in locations" :key="index">
        <v-expansion-panel-header class="headline"
          >{{ location.name }}<v-flex></v-flex
        ></v-expansion-panel-header>
        <v-expansion-panel-content>
          {{ location.description }}
          <br /><br />
          @({{ location.lat }}, {{ location.lon }}) <br /><br />
          <v-btn color="blue darker" text @click="edit(location.id)"
            >Edit</v-btn
          >
          <v-btn
            color="blue darker"
            text
            @click="removeLocation({ location: location })"
          >
            Delete
          </v-btn>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
    <br />
    <v-btn block text rounded color="blue darker" @click="newLocation">
      + New
    </v-btn>

    <v-dialog v-model="showEdit" width="500" persistent>
      <v-card>
        <v-card-title class="headline primary darken-2" primary-title>
          Edit Location
        </v-card-title>

        <v-card-text>
          <br />
          <v-form ref="form" v-if="selectedLocation !== null">
            <v-text-field
              outlined
              v-model="selectedLocation.name"
              label="Name"
              required
            ></v-text-field>
            <v-text-field
              outlined
              v-model="selectedLocation.description"
              label="Description"
              required
            ></v-text-field>
            <v-text-field
              outlined
              v-model="selectedLocation.lat"
              label="Latitude"
              required
              type="number"
            ></v-text-field>
            <v-text-field
              outlined
              v-model="selectedLocation.lon"
              label="Longitude"
              required
              type="number"
            ></v-text-field>
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
          New Location
        </v-card-title>

        <v-card-text>
          <br />
          <v-form ref="form" v-if="selectedLocation !== null">
            <v-text-field
              outlined
              v-model="selectedLocation.name"
              label="Name"
              required
            ></v-text-field>
            <v-text-field
              outlined
              v-model="selectedLocation.description"
              label="Description"
              required
            ></v-text-field>
            <v-text-field
              outlined
              v-model="selectedLocation.lat"
              label="Latitude"
              required
              type="number"
            ></v-text-field>
            <v-text-field
              outlined
              v-model="selectedLocation.lon"
              label="Longitude"
              required
              type="number"
            ></v-text-field>
          </v-form>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darker" text @click="cancelEdit">Cancel</v-btn>
          <v-btn color="primary" text @click="commitNew">
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
  name: "Locations",
  data: () => ({
    showEdit: false,
    showNew: false,
    selectedLocation: null
  }),
  methods: {
    ...mapActions(["updateLocation", "addLocation", "removeLocation"]),
    edit: function(location_id) {
      this.selectedLocation = JSON.parse(
        JSON.stringify(this.locations.filter(x => x.id === location_id)[0])
      );
      this.showEdit = true;
    },
    cancelEdit: function() {
      this.showEdit = false;
      this.showNew = false;
      this.selectedLocation = null;
    },
    commitEdit: function() {
      this.updateLocation({
        location: JSON.parse(JSON.stringify(this.selectedLocation))
      });
      this.selectedLocation = null;
      this.showEdit = false;
    },
    commitNew: function() {
      this.addLocation({
        location: JSON.parse(JSON.stringify(this.selectedLocation))
      });
      this.selectedLocation = null;
      this.showNew = false;
    },
    newLocation: function() {
      this.selectedLocation = {
        name: "",
        description: "",
        latitude: 0.0,
        longitude: 0.0
      };
      this.showNew = true;
    }
  },
  computed: {
    ...mapGetters({ locations: "getLocations" })
  }
};
</script>

<style scoped></style>
