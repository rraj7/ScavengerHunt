# API folder

## Installation

1. Clone the repo
2. Change directories to `./Code/api`
3. Run `npm install` to install the dependencies
4. Optional, configure the `.env` file
5. Run `npm start` to start the HTTP server on the given port
6. Type `Ctrl + C` to stop the server

## Usage

### Environment Variables

| Variable Name | Default Value | Description |
| ------------- | ------------- | ----------- |
| `NODE_ENV` | "development" | Google it |
| `PORT` | 3000 | Specify the port for the HTTP server to listen on |

### Routes

| Method | Route | Description | Response |
| ------ | ----- | ----------- | -------- |
| GET | `/`   | Hello world route | `200 OK`, `text/plain` |
| GET | `/locations` | Get all the scavenger hunt locations | `200 OK`, `application/json`, `Array<Location>` |

### Models

The `locations.json` file is the data source containing a list of active scavenger hunt locations. Each location has the following format:

**Location**

```json
{ 
  "id": 0,
  "name": "",
  "summary": "",
  "description": "",
  "location": {
    "lat": 0,
    "lon": 0
  }
}
```

##Tests
Make sure you have ran npm install first.
Then run this. <br/>
```npm install --save-dev babel-cli babel-preset-env jest supertest superagent```
<br/>
Now you can just run `jest` anytime.
