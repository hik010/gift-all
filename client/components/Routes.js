import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Login, Signup } from './AuthForm';
import { connect } from 'react-redux';
import { useParams, Switch, Navigate } from 'react-router-dom';
import Home from './Home';
import { me } from '../store';

const withRouter = WrappedComponent => props => {
  const params = useParams();
  // etc... other react-router-dom v6 hooks

  return (
    <WrappedComponent
      {...props}
      params={params}
      // etc...
    />
  );
};

const RoutesContainer = props => {
  useEffect(() => {
    props.loadInitialData();
  }, []);

  return (
    <div className='routes-container'>
      {props.isLoggedIn ? (
        <Routes>
          <Route path="/home" element={<Home />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      )}

      {/* {props.isLoggedIn ? <Navigate to='/home' />: null} */}
    </div>
  );
};

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
    // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me());
    },
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(RoutesContainer));
