const ADD_MOVIE = "ADD_MOVIE";
const REMOVE_MOVIE = "REMOVE_MOVIE";
const WHATCHED_MOVIE = "WHATCHED_MOVIE";

function addMovieAction(movie) {
  return {
    type: ADD_MOVIE,
    movie,
  };
}

function removeMovieAction(id) {
  return {
    type: REMOVE_MOVIE,
    id,
  };
}

function watchedMovieAction(id) {
  return {
    type: WHATCHED_MOVIE,
    id,
  };
}

function movies(state = [], action) {
  switch (action.type) {
    case ADD_MOVIE:
      return state.concat([action.movie]);
    case REMOVE_MOVIE:
      return state.filter((movie) => movie.id !== action.id);
    case WHATCHED_MOVIE:
      return state.map((movie) => {
        if (movie.id !== action.id) {
          return movie;
        } else {
          return Object.assign({}, movie, { watched: !movie.watched });
        }
      });
    default:
      return state;
  }
}

const store = Redux.createStore(
  Redux.combineReducers({
    movies,
  })
);

store.subscribe(() => {
  const { movies } = store.getState();

  document.getElementById("movies").innerHTML = "";

  movies.forEach(updateMoviesListDOM);
  console.log(movies);
});
