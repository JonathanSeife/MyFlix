const express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  uuid = require("uuid");
(morgan = require("morgan")), (fs = require("fs")), (path = require("path"));

app.use(bodyParser.json());
app.use(morgan("common"));

const accessLogStream = fs.createWriteStream(path.join(__dirname, "log.txt"), {
  flags: "a",
});

let users = [
  {
    id: 1,
    name: "John",
    favoriteMovies: [],
  },
  {
    id: 2,
    name: "Jane",
    favoriteMovies: ["Hereditary"],
  },
];

let movies = [
  {
    Title: "The Shawshank Redemption",
    Description:
      "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
    Genre: {
      Name: "Drama",
      Description:
        "Drama Films are serious presentations or stories with settings or life situations that portray realistic characters in conflict with either themselves, others, or forces of nature.",
    },
    Director: {
      Name: "Frank Darabont",
      Bio: "Three-time Oscar nominee Frank Darabont was born in a refugee camp in 1959 in Montbeliard, France, the son of Hungarian parents who had fled Budapest during the failed 1956 Hungarian revolution.",
      Born: "January 28, 1959 in Montbéliard, Doubs, France",
    },
  },

  {
    Title: "The Godfather",
    Description:
      "The aging patriarch of an organized crime dynasty in postwar New York City transfers control of his clandestine empire to his reluctant youngest son.",
    Genre: {
      Name: "Drama",
      Description:
        "Drama Films are serious presentations or stories with settings or life situations that portray realistic characters in conflict with either themselves, others, or forces of nature.",
    },
    Director: {
      Name: "Francis Ford Coppola",
      Bio: "Francis Ford Coppola was born in 1939 in Detroit, Michigan, but grew up in a New York suburb in a creative, supportive Italian-American family. His father, Carmine Coppola, was a composer and musician.",
      Born: "April 7, 1939 in Detroit, Michigan, USA",
    },
  },

  {
    Title: "The Dark Knight",
    Description:
      "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
    Genre: {
      Name: "Drama",
      Description:
        "Drama Films are serious presentations or stories with settings or life situations that portray realistic characters in conflict with either themselves, others, or forces of nature.",
    },
    Director: {
      Name: "Christopher Nolan",
      Bio: "Best known for his cerebral, often nonlinear, storytelling, acclaimed writer-director Christopher Nolan was born on July 30, 1970, in London, England.",
      Born: "July 30, 1970 in London, England, UK",
    },
  },

  {
    Title: "The Godfather 2",
    Description:
      "The early life and career of Vito Corleone in 1920s New York City is portrayed, while his son, Michael, expands and tightens his grip on the family crime syndicate.",
    Genre: {
      Name: "Drama",
      Description:
        "Drama Films are serious presentations or stories with settings or life situations that portray realistic characters in conflict with either themselves, others, or forces of nature.",
    },
    Director: {
      Name: "Francis Ford Coppola",
      Bio: "Francis Ford Coppola was born in 1939 in Detroit, Michigan, but grew up in a New York suburb in a creative, supportive Italian-American family. His father, Carmine Coppola, was a composer and musician.",
      Born: "April 7, 1939 in Detroit, Michigan, USA",
    },
  },

  {
    Title: "Hereditary",
    Description:
      "A grieving family is haunted by tragic and disturbing occurrences.",
    Genre: {
      Name: "Horror",
      Description:
        "Horror is a genre of storytelling intended to scare, shock, and thrill its audience.",
    },
    Director: {
      Name: "Ari Aster",
      Bio: "Ari Aster is an American film director, screenwriter, and producer. He is known for writing and directing the A24 horror films Hereditary (2018) and Midsommar (2019).",
      Born: "July 15, 1986 in New York City, New York, USA",
    },
  },

  {
    Title: "Schindler's List",
    Description:
      "In German-occupied Poland during World War II, industrialist Oskar Schindler gradually becomes concerned for his Jewish workforce after witnessing their persecution by the Nazis.",
    Genre: {
      Name: "Drama",
      Description:
        "Drama Films are serious presentations or stories with settings or life situations that portray realistic characters in conflict with either themselves, others, or forces of nature.",
    },
    Director: {
      Name: "Steven Spielberg",
      Bio: "One of the most influential personalities in the history of cinema, Steven Spielberg is Hollywood's best known director and one of the wealthiest filmmakers in the world.",
      Born: "December 18, 1946 in Cincinnati, Ohio, USA",
    },
  },

  {
    Title: "Lord of the Rings: The Return of the King",
    Description:
      "Gandalf and Aragorn lead the World of Men against Sauron's army to draw his gaze from Frodo and Sam as they approach Mount Doom with the One Ring.",
    Genre: {
      Name: "Drama",
      Description:
        "Drama Films are serious presentations or stories with settings or life situations that portray realistic characters in conflict with either themselves, others, or forces of nature.",
    },
    Director: {
      Name: "Peter Jackson",
      Bio: "Sir Peter Jackson made history with The Lord of the Rings trilogy, becoming the first person to direct three major feature films simultaneously.",
      Born: "October 31, 1961 in Pukerua Bay, North Island, New Zealand",
    },
  },

  {
    Title: "Pulp Fiction",
    Description:
      "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
    Genre: {
      Name: "Drama",
      Description:
        "Drama Films are serious presentations or stories with settings or life situations that portray realistic characters in conflict with either themselves, others, or forces of nature.",
    },
    Director: {
      Name: "Quentin Tarantino",
      Bio: "In January of 1992, first-time writer-director Tarantino's Reservoir Dogs (1992) appeared at the Sundance Film Festival. The film garnered critical acclaim and the director became a legend immediately.",
      Born: "March 27, 1963 in Knoxville, Tennessee, USA",
    },
  },

  {
    Title: "Donnie Darko",
    Description:
      "After narrowly escaping a bizarre accident, a troubled teenager is plagued by visions of a man in a large rabbit suit who manipulates him to commit a series of crimes.",
    Genre: {
      Name: "Drama",
      Description:
        "Drama Films are serious presentations or stories with settings or life situations that portray realistic characters in conflict with either themselves, others, or forces of nature.",
    },
    Director: {
      Name: "Richard Kelly",
      Bio: "James Richard Kelly better known as Richard Kelly, is an American film director and writer, known for writing and directing the cult classic Donnie Darko in 2001.",
      Born: "March 28, 1975 in Newport News, Virginia, USA",
    },
  },

  {
    Title: "Midsommar",
    Description:
      "A couple travels to Northern Europe to visit a rural hometown's fabled Swedish mid-summer festival. What begins as an idyllic retreat quickly devolves into an increasingly violent and bizarre competition at the hands of a pagan cult.",
    Genre: {
      Name: "Horror",
      Description:
        "Horror is a genre of storytelling intended to scare, shock, and thrill its audience.",
    },
    Director: {
      Name: "Ari Aster",
      Bio: "Ari Aster is an American film director, screenwriter, and producer. He is known for writing and directing the A24 horror films Hereditary (2018) and Midsommar (2019).",
      Born: "July 15, 1986 in New York City, New York, USA",
    },
  },

  {
    Title: "Inception",
    Description:
      "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O., but his tragic past may doom the project and his team to disaster.",
    Genre: {
      Name: "Drama",
      Description:
        "Drama Films are serious presentations or stories with settings or life situations that portray realistic characters in conflict with either themselves, others, or forces of nature.",
    },
    Director: {
      Name: "Christopher Nolan",
      Bio: "Best known for his cerebral, often nonlinear, storytelling, acclaimed writer-director Christopher Nolan was born on July 30, 1970, in London, England.",
      Born: "July 30, 1970 in London, England, UK",
    },
  },
];

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send("Welcome to my MyFlix movie app!");
});

app.get("/movies", (req, res) => {
  res.status(200).json(movies);
});

app.get("/movies/:title", (req, res) => {
  const { title } = req.params;
  const movie = movies.find((movie) => movie.Title === title);

  if (movie) {
    res.status(200).json(movie);
  } else {
    res.status(400).send("no such movie");
  }
});
app.get("/movies/:title", (req, res) => {
  const { title } = req.params;
  const movie = movies.find((movie) => movie.Title === title);

  if (movie) {
    res.status(200).json(movie);
  } else {
    res.status(400).send("no such movie");
  }
});

app.get("/movies/genre/:genreName", (req, res) => {
  const { genreName } = req.params;
  const genre = movies.find((movie) => movie.Genre.Name === genreName).Genre;

  if (genre) {
    res.status(200).json(genre);
  } else {
    res.status(400).send("no such genre");
  }
});

app.get("/movies/director/:directorName", (req, res) => {
  const { directorName } = req.params;
  const director = movies.find(
    (movie) => movie.Director.Name === directorName
  ).Director;

  if (director) {
    res.status(200).json(director);
  } else {
    res.status(400).send("no such genre");
  }
});
app.post("/users", (req, res) => {
  const newUser = req.body;

  if (newUser.name) {
    newUser.id = uuid.v4();
    users.push(newUser);
    res.status(201).json(newUser);
  } else {
    res.status(400).send("users need names");
  }
});
app.put("/users/:id", (req, res) => {
  const { id } = req.params;
  const updateUser = req.body;

  let user = users.find((user) => user.id == id);

  if (user) {
    user.name = updateUser.name;
    res.status(200).json(user);
  } else {
    res.status(400).send("user not found");
  }
});
app.post("/users/:id/:movieTitle", (req, res) => {
  const { id, movieTitle } = req.params;

  let user = users.find((user) => user.id == id);

  if (user) {
    user.favoriteMovies.push(movieTitle);
    res.status(200).send(`${movieTitle} has been added to user ${id}'s array`);
  } else {
    res.status(400).send("user not found");
  }
});

app.delete("/users/:id/:movieTitle", (req, res) => {
  const { id, movieTitle } = req.params;

  let user = users.find((user) => user.id == id);

  if (user) {
    user.favoriteMovies = user.favoriteMovies.filter(
      (title) => title !== movieTitle
    );
    res
      .status(200)
      .send(`${movieTitle} has been removed from user ${id}'s array`);
  } else {
    res.status(400).send("user not found");
  }
});

app.delete("/users/:id", (req, res) => {
  const { id } = req.params;

  let user = users.find((user) => user.id == id);

  if (user) {
    users = users.filter((user) => user.id != id);
    res.status(200).send(`user ${id} has been deleted`);
  } else {
    res.status(400).send("user not found");
  }
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(8080, () => {
  console.log("Your app is listening on port 8080.");
});
