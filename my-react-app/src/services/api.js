function fail() {
  return Math.floor(Math.random() * (5 - 1)) === 3;
}

function generateId() {
  return Math.random().toString(36).substring(2);
}

var movies = [
  {
    id: generateId(),
    name: "Interestelar",
    watched: false,
  },
  {
    id: generateId(),
    name: "Harry Potter and the Order of Phoenix",
    watched: false,
  },
  {
    id: generateId(),
    name: "The Lion King",
    watched: true,
  },
];

const fetchMovies = function () {
  return new Promise((res, rej) => {
    setTimeout(function () {
      res(movies);
    }, 2000);
  });
};

const saveMovie = function (name) {
  return new Promise((res, rej) => {
    setTimeout(() => {
      const movie = {
        id: generateId(),
        name: name,
        watched: false,
      };
      movies = movies.concat([movie]);
      fail() ? rej(movie) : res(movie);
    }, 300);
  });
};

const deleteMovies = function (id) {
  return new Promise((res, rej) => {
    setTimeout(() => {
      movies = movies.filter((movie) => movie.id !== id);
      fail() ? rej() : res(movies);
    }, 300);
  });
};

const saveMovieWatched = function (id) {
  return new Promise((res, rej) => {
    setTimeout(() => {
      movies = movies.map((todo) =>
        todo.id !== id
          ? todo
          : Object.assign({}, todo, { watched: !todo.watched })
      );

      fail() ? rej() : res(movies);
    }, 300);
  });
};

export { saveMovie, fetchMovies, deleteMovies, saveMovieWatched };
