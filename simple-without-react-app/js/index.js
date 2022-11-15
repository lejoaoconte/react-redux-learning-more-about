const ADD_MOVIE = "ADD_MOVIE";
const REMOVE_MOVIE = "REMOVE_MOVIE";
const WHATCHED_MOVIE = "WHATCHED_MOVIE";
const RECEIVE_DATA = "RECEIVE_DATA";

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

function receiveDataAction(movies) {
  return {
    type: RECEIVE_DATA,
    movies,
  };
}

function deleteMovie(movie) {
  return (dispatch) => {
    dispatch(removeMovieAction(movie.id));

    return API.deleteMovie(movie.id).catch(() => {
      dispatch(addMovieAction(movie));
      alert("Error! Please try again!");
    });
  };
}

function addMovie(name, func) {
  return (dispatch) => {
    return API.saveMovie(name)
      .then((movie) => {
        dispatch(addMovieAction(movie));
        func();
      })
      .catch(() => {
        alert("Error! Please try again!");
      });
  };
}

function watchedMovie(id) {
  return (dispatch) => {
    dispatch(watchedMovieAction(id));

    return API.saveMovieWatched(id).catch(() => {
      store.dispatch(watchedMovieAction(id));
      alert("Error! Please try again!");
    });
  };
}

function getInitialData() {
  return async (dispatch) => {
    const [movies] = await Promise.all([API.fetchMovies()]);
    dispatch(receiveDataAction(movies));
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
    case RECEIVE_DATA:
      return action.movies;
    default:
      return state;
  }
}

function loading(state = true, action) {
  switch (action.type) {
    case RECEIVE_DATA:
      return false;
    default:
      return state;
  }
}

const checker = (store) => (next) => (action) => {
  if (
    action.type === ADD_MOVIE &&
    (action.movie.name.toLowerCase() === " " || //.includes("") ||
      action.movie.name.toLowerCase() === "")
  ) {
    return alert("Pass a valid movie name");
  }

  return next(action);
};

const logger = (store) => (next) => (action) => {
  console.group(action.type);

  console.log("The action: ", action);
  const result = next(action);
  console.log("The new state: ", store.getState());

  console.groupEnd();

  return result;
};

const store = Redux.createStore(
  Redux.combineReducers({
    movies,
    loading,
  }),
  Redux.applyMiddleware(ReduxThunk.default, checker, logger)
);
