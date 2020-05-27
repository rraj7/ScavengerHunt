import Vue from "vue";
import Router from "vue-router";
import ScavengerMap from "./components/ScavengerMap";
// import VisitedLocations from "./components/VisitedLocations";
import Settings from "./components/Settings";
import About from "./components/About";
// import Games from "./components/Games";
import MyGames from "./components/MyGames";
import AllGames from "./components/admin/AllGames";
import Locations from "./components/admin/Locations";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: ScavengerMap
    },
    {
      path: "/map",
      name: "map",
      component: ScavengerMap
    },
    // {
    //   path: "/visited",
    //   name: "visited",
    //   component: VisitedLocations
    // },
    {
      path: "/settings",
      name: "settings",
      component: Settings
    },
    {
      path: "/about",
      name: "about",
      component: About
    },
    {
      path: "/games",
      name: "games",
      component: MyGames
    },
    {
      path: "/admin/games",
      name: "admin-games",
      component: AllGames
    },
    {
      path: "/admin/locations",
      name: "admin-locations",
      component: Locations
    }
  ]
});
