// Dependencies
const http = require("http");
require("dotenv").config();

const app = require("./src/app/app");
const db = require("./src/db/db");

const server = http.createServer(app);

const PORT = process.env.NODE_ENV === "production" ? 5000 : 4000;
const CONNECTION_STRING = process.env.CONNECTION_STRING; // Use the correct variable name

db.connect(CONNECTION_STRING)
  .then(() => {
    console.log("Database Connected");
    server.listen(PORT, (err) => {
      if (!err) {
        console.log(`Server is running on port:${PORT}`);
      } else {
        console.log("Error while running the server");
        console.log(err.message);
      }
    });
  })
  .catch((err) => {
    console.log(err.message);
  });
