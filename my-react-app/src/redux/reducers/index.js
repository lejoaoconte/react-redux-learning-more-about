import { combineReducers } from "redux";

import movies from "./movies";
import loading from "./loading";

export default combineReducers({
  movies,
  loading,
});
