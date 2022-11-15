import API from "../../services/api";

export const ADD_MOVIE = "ADD_MOVIE";
export const REMOVE_MOVIE = "REMOVE_MOVIE";
export const WHATCHED_MOVIE = "WHATCHED_MOVIE";

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

export function deleteMovie(movie) {
  return (dispatch) => {
    dispatch(removeMovieAction(movie.id));

    return API.deleteMovie(movie.id).catch(() => {
      dispatch(addMovieAction(movie));
      alert("Error! Please try again!");
    });
  };
}

export function addMovie(name, func) {
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

export function watchedMovie(id) {
  return (dispatch) => {
    dispatch(watchedMovieAction(id));

    return API.saveMovieWatched(id).catch(() => {
      store.dispatch(watchedMovieAction(id));
      alert("Error! Please try again!");
    });
  };
}
