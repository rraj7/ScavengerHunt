const express = require("express");
const app = require('./app');
const cors = require("cors");
const sql = require("mssql");

const locations = require("./data.json");

const config = {
  user: "api_user",
  password: "y5F8wgJZdCxirhmeGKd6",
  server: "cs440.cko4d29a9n7t.us-east-1.rds.amazonaws.com",
  database: "ScavengerHunt"
};

app.use(
  cors({
    origin: true
  })
);

app.use(express.json());

app.route("/landmarks").get(async (req, res) => {
  await sql.connect(config);
  const { recordsets } = await new sql.Request().execute("sp_GetLandmarks");
  res.json(
    recordsets[0].map(x => {
      return {
        id: x.landmark_id,
        name: x.name,
        description: x.description,
        lat: x.latitude,
        lon: x.longitude
      };
    })
  );
});

app.route("/locations").get((_req, res, _next) => {
  res.json(locations);
});

//sp_Newlandmark
app.post("/new-landmark", async (_req, _res, _next) => {
  const { name, description, latitude, longitude } = _req.body;

  const request = new sql.Request();

  request
    .input("name", sql.NVarChar, name)
    .input("description", sql.NVarChar, description)
    .input("longitude", sql.Real, longitude)
    .input("latitude", sql.Real, latitude);

  try {
    const { recordset } = await request.execute("sp_NewLandmark");
    // TODO: map db records to response
    _res.json(recordset);
  } catch (ex) {
    _res.status(500).send(ex);
  }
});
//sp_AddLandmarkToGame
app.post("/add-landmark-to-game", async (_req, _res, _next) => {
  const { game_id, landmark_id } = _req.body;

  const request = new sql.Request();

  request
    .input("game_id", sql.int, game_id)
    .input("landmark_id", sql.int, landmark_id);

  try {
    const { recordset } = await request.execute("sp_AddLandmarkToGame");
    // TODO: map db records to response
    _res.json(recordset);
  } catch (ex) {
    _res.status(500).send(ex);
  }
});
//sp_AddPlayerToGame
app.post("/add-player-to-game", async (_req, _res, _next) => {
  const { game_id, player_id } = _req.body;

  const request = new sql.Request();

  request
    .input("game_id", sql.int, game_id)
    .input("player_id", sql.int, player_id);

  try {
    const { recordset } = await request.execute("sp_AddPlayerToGame");
    // TODO: map db records to response
    _res.json(recordset);
  } catch (ex) {
    _res.status(500).send(ex);
  }
});
//sp_GetMyGames
app.post("/get-my-games", async (_req, _res, _next) => {
  const { player_id } = _req.body;

  const request = new sql.Request();

  request.input("player_id", sql.int, player_id);

  try {
    const { recordset } = await request.execute("sp_GetMyGames");
    // TODO: map db records to response
    _res.json(recordset);
  } catch (ex) {
    _res.status(500).send(ex);
  }
});
//sp_GetWinners
app.post("get-winners", async (_req, _res, _next) => {
  const { game_id } = _req.body;

  const request = new sql.Request();

  request.input("game_id", sql.int, game_id);

  try {
    const { recordset } = await request.execute("sp_GetWinners");
    // TODO: map db records to response
    _res.json(recordset);
  } catch (ex) {
    _res.status(500).send(ex);
  }
});
//sp_LogPlayerLocation
app.post("/log-player-location", async (_req, _res, _next) => {
  const { game_id, latitude, longitude } = _req.body;

  const request = new sql.Request();

  request
    .input("game_id", sql.int, game_id)
    .input("longitude", sql.Real, longitude)
    .input("latitude", sql.Real, latitude);

  try {
    const { recordset } = await request.execute("sp_LogPlayerLocation");
    // TODO: map db records to response
    _res.json(recordset);
  } catch (ex) {
    _res.status(500).send(ex);
  }
});
//sp_NewGame
app.post("/new-game", async (_req, _res, _next) => {
  const { name, created_by, range_epsilon, active } = _req.body;

  const request = new sql.Request();

  request
    .input("name", sql.nvchar, name)
    .input("created_by", sql.int, created_by)
    .input("range_epsilon", sql.real, range_epsilon)
    .input("active", sql.bit, active);

  try {
    const { recordset } = await request.execute("sp_NewGame");
    // TODO: map db records to response
    _res.json(recordset);
  } catch (ex) {
    _res.status(500).send(ex);
  }
});
//sp_NewPlayer
app.post("new-player", async (_req, _res, _next) => {
  const { name, email } = _req.body;

  const request = new sql.Request();

  request.input("name", sql.nvchar, name).input("email", sql.nvchar, email);

  try {
    const { recordset } = await request.execute("sp_NewPlayer");
    // TODO: map db records to response
    _res.json(recordset);
  } catch (ex) {
    _res.status(500).send(ex);
  }
});
//sp_PlayerVisitedLocation
app.post("/player-visited-location", async (_req, _res, _next) => {
  const { game_id, landmark_id, player_id } = _req.body;

  const request = new sql.Request();

  request
    .input("game_id", sql.int, game_id)
    .input("landmark_id", sql.int, landmark_id)
    .input("player_id", sql.int, player_id);

  try {
    const { recordset } = await request.execute("sp_PlayerVisitedLocation");
    // TODO: map db records to response
    _res.json(recordset);
  } catch (ex) {
    _res.status(500).send(ex);
  }
});
//sp_RemoveLandmarkFromGame
app.post("/remove-landamrk-from-game", async (_req, _res, _next) => {
  const { game_id, landmark_id } = _req.body;

  const request = new sql.Request();

  request
    .input("game_id", sql.int, game_id)
    .input("landmark_id", sql.int, landmark_id);

  try {
    const { recordset } = await request.execute("sp_RemoveLandmarkFromGame");
    // TODO: map db records to response
    _res.json(recordset);
  } catch (ex) {
    _res.status(500).send(ex);
  }
});

app.get("/nearme", (_req, res, _next) => {
  // parse the client's lat and lon from the query params
  // TODO: query the DB for the list of locations that are within a configurable distance from the client's given coords
  // TODO: respond to the client with the list of locations
  res.status(501).end();
});

app.post("/visit/:locationID", (_req, res, _next) => {
  // TODO: parse locationID from path and validate it
  // TODO: parse client's lat and lon from body
  // TODO: determine whether client is within a distance from the given location (use haversine formula)
  // TODO: persist the check-in if successful
  // TODO: respond to the client with the result
  res.status(501).end();
});

module.exports = app;
