import { fetchMovies } from "../../services/api";

export const RECEIVE_DATA = "RECEIVE_DATA";

function receiveDataAction(movies) {
  return {
    type: RECEIVE_DATA,
    movies,
  };
}

export function getInitialData() {
  return async (dispatch) => {
    const [movies] = await Promise.all([fetchMovies()]);
    dispatch(receiveDataAction(movies));
  };
}
