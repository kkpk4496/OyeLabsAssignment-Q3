const express = require("express");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const path = require("path");

const databasePath = path.join(__dirname, "detailsDatabase.db");

const app = express();

app.use(express.json());

let database = null;

const initializeDbAndServer = async () => {
  try {
    database = await open({
      filename: databasePath,
      driver: sqlite3.Database,
    });

    app.listen(3000, () =>
      console.log("Server Running at http://localhost:3000/")
    );
  } catch (error) {
    console.log(`DB Error: ${error.message}`);
    process.exit(1);
  }
};

initializeDbAndServer();

app.post("/", async (request, response) => {
  const { email, name } = request.body;
  const postQuery = `
  INSERT INTO
    details (email,name)
  VALUES
    (${email}, '${name}');`;
  await database.run(postQuery);
  response.send("Successfully Added");
});

module.exports = app;
