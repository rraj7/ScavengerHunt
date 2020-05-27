<template>
  <v-app>
    <v-app-bar app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Scavenger Hunt</v-toolbar-title>
      <div class="flex-grow-1"></div>
      <div>Group 17</div>
    </v-app-bar>

    <v-navigation-drawer app v-model="drawer" mini-variant.sync="true">
      <v-list nav>
        <v-subheader>Welcome</v-subheader>
        <v-list-item
          v-for="(link, index) in links"
          :key="index"
          link
          :to="{ name: link.to }"
        >
          <v-list-item-icon>
            <v-icon>{{ link.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ link.name }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-subheader>Admin</v-subheader>
        <v-list-item
          v-for="(link, index) in adminLinks"
          :key="index + links.length"
          link
          :to="{ name: link.to }"
        >
          <v-list-item-icon>
            <v-icon>{{ link.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ link.name }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-content>
      <v-container fluid style="width:100%; height: 100%;">
        <router-view style="width:100%; height: 100%;"></router-view>
        <!--        <scavenger-map style="width:100%; height: 100%;" />-->
      </v-container>
    </v-content>

    <v-footer app></v-footer>
  </v-app>
</template>

<script>
export default {
  name: "App",
  components: {},
  data: () => ({
    drawer: false,
    links: [
      {
        name: "Map",
        to: "map",
        icon: "mdi-google-maps"
      },
      // {
      //   name: "Visited Locations",
      //   to: "visited",
      //   icon: "mdi-map-marker-check"
      // },
      {
        name: "Settings",
        to: "settings",
        icon: "mdi-tune"
      },
      {
        name: "About",
        to: "about",
        icon: "mdi-information-outline"
      },
      {
        name: "Games",
        to: "games",
        icon: "mdi-gamepad"
      }
    ],
    adminLinks: [
      {
        name: "Game Manager",
        to: "admin-games",
        icon: "mdi-calendar"
      },
      {
        name: "Location Manager",
        to: "admin-locations",
        icon: "mdi-crosshairs-gps"
      }
    ]
  }),
  created() {
    this.$store.dispatch("updateLocations");
  }
};
</script>
