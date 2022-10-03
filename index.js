const express = require("express"),
  morgan = require("morgan"),
  fs = require("fs"),
  path = require("path");

const app = express();
const accessLogStream = fs.createWriteStream(path.join(__dirname, "log.txt"), {
  flags: "a",
});
app.use(morgan("combined", { stream: accessLogStream }));

let topTenMovies = [
  {
    title: "The Shawshank Redemption",
  },
  {
    title: "The Godfather",
  },
  {
    title: "The Dark Knight",
  },
  {
    title: "Hereditary",
  },
  {
    title: "The Godfather 2",
  },
  {
    title: "Schindler's List",
  },
  {
    title: "Lord of the Rings: The Return of the King",
  },
  {
    title: "Pulp Fiction",
  },
  {
    title: "Donnie Darko",
  },
  {
    title: "Inception",
  },
];

app.get("/", (req, res) => {
  res.send("Welcome to my MyFlix movie app!");
});

app.get("/movies", (req, res) => {
  res.json(topTenMovies);
});

app.get("/documentation.html", (req, res) => {
  res.sendFile("public/documentation.html", { root: __dirname });
});
app.use("/documentation.html", express.static("public"));

app.use((err, req, res, nect) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(8080, () => {
  console.log("Your app is listening on port 8080.");
});
