const API_URL = process.env.VUE_APP_API_URL || "https://api.jterhark.dev";

export class Location {
  constructor({
    id = 0,
    name = "",
    summary = "",
    description = "",
    location = {}
  } = {}) {
    this.id = id;
    this.name = name;
    this.summary = summary;
    this.description = description;
    if (!location.lat || !location.lon)
      throw new TypeError("'lat' or 'lon' not defined on location response");
    this.location = location;
  }
}

export function getLocations() {
  return fetch(API_URL + "/locations", { method: "GET", mode: "cors" })
    .then(response => {
      if (!response.ok) {
        const err = new Error("Response not ok");
        err.response = response;
        throw err;
      }

      return response.json();
    })
    .then(locations => locations.map(location => new Location(location)));
}

export async function getLandmarks() {
  return fetch(API_URL + "/landmarks", { method: "GET", mode: "cors" })
    .then(response => {
      if (!response.ok) {
        const err = new Error("Response not ok");
        err.response = response;
        throw err;
      }

      return response.json();
    })
    .then(locations => locations);
}
