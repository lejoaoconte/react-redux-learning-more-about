import React from "react";

import { connect } from "react-redux";

import { addMovie, deleteMovie, watchedMovie } from "../redux/actions/movies";

import List from "./List";

const Movies = (props) => {
  const inputRef = React.useRef();

  const handleAddMovie = (e) => {
    e.preventDefault();
    props.dispatch(
      addMovie(inputRef.current.value, () => (inputRef.current.value = ""))
    );
  };

  const handleRemoveMovie = (movie) => {
    props.dispatch(deleteMovie(movie));
  };

  const handleWatchedMovie = (movie) => {
    props.dispatch(watchedMovie(movie.id));
  };

  return (
    <div>
      <div id="moviesBody">
        <h1>Movies List</h1>
        <input
          id="movie"
          type="text"
          placeholder="Enter movie name"
          ref={inputRef}
        />
        <button onClick={handleAddMovie} id="movieButton">
          Add Movie
        </button>
        <List
          watched={handleWatchedMovie}
          remove={handleRemoveMovie}
          items={props.movies}
        />
      </div>
    </div>
  );
};

export default connect((state) => ({
  movies: state.movies,
}))(Movies);
