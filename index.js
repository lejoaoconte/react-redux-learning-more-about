function createStore(reducer) {
  let state;
  let listerners = [];

  function getState() {
    return state;
  }

  function subscribe(listerner) {
    listerners.push(listerner);
    return () => {
      listerners = listerners.filter((l) => l !== listerner);
    };
  }

  function dispatch(action) {
    state = reducer(state, action);
    listerners.forEach((listerner) => listerner());
  }

  return { getState, subscribe, dispatch };
}

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

function application(state = {}, action) {
  return {
    movies: movies(state.movies, action),
  };
}

const store = createStore(application);

store.subscribe(() => {
  const { movies } = store.getState();

  document.getElementById("movies").innerHTML = "";

  movies.forEach(updateMoviesListDOM);
  console.log(movies);
});
