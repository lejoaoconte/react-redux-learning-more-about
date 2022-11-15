import API from "../../services/api";

export const RECEIVE_DATA = "RECEIVE_DATA";

function receiveDataAction(movies) {
  return {
    type: RECEIVE_DATA,
    movies,
  };
}

function getInitialData() {
  return async (dispatch) => {
    const [movies] = await Promise.all([API.fetchMovies()]);
    dispatch(receiveDataAction(movies));
  };
}
