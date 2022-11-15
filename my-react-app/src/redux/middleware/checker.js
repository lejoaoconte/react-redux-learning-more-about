export const checker = (store) => (next) => (action) => {
  if (
    action.type === ADD_MOVIE &&
    (action.movie.name.toLowerCase() === " " || //.includes("") ||
      action.movie.name.toLowerCase() === "")
  ) {
    return alert("Pass a valid movie name");
  }

  return next(action);
};
