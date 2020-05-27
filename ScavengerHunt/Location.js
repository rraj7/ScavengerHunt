module.exports = class Location {
  constructor({
    id = 0,
    name = "",
    summary = "",
    description = "",
    lat = 0,
    lon = 0
  } = {}) {
    this.id = id;
    this.name = name;
    this.summary = summary;
    this.description = description;
    this.location = { lat, lon };
  }
};
