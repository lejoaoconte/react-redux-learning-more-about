import React, { useEffect } from "react";

import ConnectedMovies from "./components/Movies";

import { connect } from "react-redux";

import { getInitialData } from "./redux/actions/shared";

const App = (props) => {
  useEffect(() => {
    props.dispatch(getInitialData());
  }, [props]);

  if (props.loading) {
    return <h1 id="loading">Loading</h1>;
  }

  return (
    <div>
      <ConnectedMovies />
    </div>
  );
};

export default connect((state) => ({
  loading: state.loading,
}))(App);
