import { deleteMovies, saveMovie, saveMovieWatched } from "../../services/api";

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
  return async (dispatch) => {
    dispatch(removeMovieAction(movie.id));

    try {
      return await deleteMovies(movie.id);
    } catch {
      dispatch(addMovieAction(movie));
      alert("Error! Please try again!");
    }
  };
}

export function addMovie(name, func) {
  return async (dispatch) => {
    try {
      const movie = await saveMovie(name);
      dispatch(addMovieAction(movie));
      func();
    } catch {
      alert("Error! Please try again!");
    }
  };
}

export function watchedMovie(id) {
  return async (dispatch) => {
    dispatch(watchedMovieAction(id));

    try {
      return await saveMovieWatched(id);
    } catch {
      dispatch(watchedMovieAction(id));
      alert("Error! Please try again!");
    }
  };
}
