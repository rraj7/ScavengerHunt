import Vue from "vue";
import Vuex from "vuex";
import * as api from "./api";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    locations: [
      // {
      //   id: 1,
      //   name: "Landmark 1",
      //   description: "desc 1",
      //   lat: 50,
      //   lon: 50
      // },
      // {
      //   id: 2,
      //   name: "Landmark 2",
      //   description: "desc 2",
      //   lat: 50,
      //   lon: 50
      // },
      // {
      //   id: 3,
      //   name: "Landmark 3",
      //   description: "desc 3",
      //   lat: 50,
      //   lon: 50
      // },
      // {
      //   id: 4,
      //   name: "Landmark 4",
      //   description: "desc 4",
      //   lat: 50,
      //   lon: 50
      // }
    ],
    visited: [
      {
        game_id: 3,
        visited: [9, 12]
      },
      {
        game_id: 4,
        visited: [14]
      },
      {
        game_id: 1,
        visited: [6, 15]
      },
      {
        game_id: 2,
        visited: []
      }
    ],
    games: [
      {
        game_id: 1,
        name: "Test Hunt",
        created_by: "jterha2",
        locations: [6, 10, 15],
        players: [100],
        active: true
      },
      {
        game_id: 2,
        name: "Another Hunt",
        created_by: "bob",
        locations: [7, 8],
        players: [100],
        active: false
      },
      {
        game_id: 3,
        name: "Super What",
        created_by: "jterha2",
        active: true,
        players: [100],
        locations: [9, 11, 12]
      },
      {
        game_id: 4,
        name: "ASDF",
        created_by: "jterha2",
        active: false,
        players: [100],
        locations: [13, 14]
      }
    ],
    player_id: 100
  },
  mutations: {
    setLocations(state, locs) {
      state.locations = locs;
    },
    markVisited(state, loc) {
      console.log(loc.id);
      let games = state.games
        .filter(x => x.locations.includes(loc.id))
        .map(x => x.game_id);
      for (const x of state.visited) {
        if (games.includes(x.game_id)) {
          if (!x.visited.includes(loc.id)) {
            x.visited.push(loc.id);
          }
        }
      }
    },
    moveToMyGames(state, id) {
      if (!state.visited.some(x => x.game_id === id)) {
        state.visited.push({ game_id: id, visited: [] });
      }
      let game = state.games.filter(x => x.game_id === id)[0];
      game.players.push(state.player_id);
    },
    moveOutOfMyGames(state, id) {
      let game = state.games.filter(x => x.game_id === id)[0];
      let index = game.players.indexOf(state.player_id);
      game.players.splice(index, 1);
    },
    pushLocation(state, location) {
      state.locations.push(location);
    },
    deleteLocation(state, location_id) {
      console.log(location_id);
      let index = state.locations.findIndex(x => x.id === location_id);
      console.log(index);
      state.locations.splice(index, 1);
    },
    pushGame(state, game) {
      state.games.push(game);
    },
    updateGame(state, game) {
      let index = state.games.findIndex(x => x.game_id === game.game_id);
      state.games.splice(index, 1);
      state.games.push(game);
    },
    updateLocations(state, locations) {
      state.locations = locations;
    }
  },
  actions: {
    updateLocations({ commit }) {
      api
        .getLandmarks()
        .then(locations => commit("updateLocations", locations));
    },
    joinGame({ commit }, { id }) {
      commit("moveToMyGames", id);
    },
    leaveGame({ commit }, { id }) {
      commit("moveOutOfMyGames", id);
    },
    addLocation({ commit, getters }, { location }) {
      console.log(getters);
      location.id = getters.getLocations.length * 2;
      commit("pushLocation", location);
    },
    removeLocation({ commit }, { location }) {
      commit("deleteLocation", location.id);
    },
    updateLocation({ commit }, { location }) {
      commit("deleteLocation", location.id);
      commit("pushLocation", location);
    },
    createGame({ commit, getters }, { game }) {
      game.game_id = getters.getGames.length + 1;
      game.created_by = "jterha2";
      game.players = [];
      commit("pushGame", game);
    },
    alterGame({ commit }, { game }) {
      commit("updateGame", game);
    }
  },
  getters: {
    getLocations: state => {
      return state.locations;
    },
    getMyLocations: state => {
      let myGames = state.games.filter(x =>
        x.players.includes(state.player_id)
      );

      const w = [];

      for (const x of myGames) {
        const visit = state.visited.filter(a => a.game_id === x.game_id)[0]
          .visited;
        for (const loc of x.locations) {
          if (!visit.includes(loc)) {
            w.push(loc);
          }
        }
      }

      return state.locations.filter(x => w.includes(x.id));
      // let locations = [].concat.apply([], myGames.map(x => x.locations));
      // let ids = myGames.map(x => x.game_id);
      // let myLocations = [].concat.apply(
      //   [],
      //   state.visited.filter(x => ids.includes(x.game_id)).map(x => x.visited)
      // );
      // let unvisited = locations.filter(x => !myLocations.includes(x));
      // console.log('unvisited');
      // console.log(unvisited)
      // return state.locations.filter(x => unvisited.includes(x.id));
    },
    getVisited: state => {
      return state.visited;
    },
    getGames: state => state.games,
    getMyGames: state =>
      state.games.filter(x => x.players.includes(state.player_id)),
    getVisitedGameLocations: state => game_id => {
      let visited = state.visited.filter(x => x.game_id === game_id)[0];
      if (!visited) return [];
      return state.locations.filter(x => visited.visited.includes(x.id));
    },
    getGameLocations: state => game_id => {
      let game = state.games.filter(x => x.game_id === game_id)[0];
      return state.locations.filter(x => game.locations.includes(x.id));
    },
    getLocation: state => loc_id => {
      return state.locations.filter(x => x.id === loc_id)[0];
    },
    getAllGames: state => {
      return state.games.sort((a, b) => {
        if (a.name < b.name) return -1;
        if (a.name >= b.name) return 1;
      });
    },
    getAvailableGames: state => {
      return state.games.filter(x => !x.players.includes(state.player_id));
    }
  }
});
