import { ADD_MOVIE, REMOVE_MOVIE, WHATCHED_MOVIE } from "../actions/movies";
import { RECEIVE_DATA } from "../actions/shared";

export function movies(state = [], action) {
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
