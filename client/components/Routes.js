import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Login, Signup } from './forms/AuthForm';
import { connect } from 'react-redux';
import { useParams, } from 'react-router-dom';
import { useNavigate } from 'react-router';
import { me } from '../store';
import { MyDashboard } from './MyDashboard';
import MyProfile from './MyProfile';
import LandingPage from './LandingPage';

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
  const navigate = useNavigate();
  useEffect(() => {
    props.loadInitialData();
    console.log(props)
    console.log('rerender')
  }, []);

  return (
    <div className='routes-container px-5'>
      {props.isLoggedIn ? (
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<MyDashboard auth={props.auth}/>} />
          <Route path="/profile" element={<MyProfile auth={props.auth}/>} />

        </Routes>

      ) : (
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      )}

      {/* {props.isLoggedIn ? navigate('/home') : null} */}
    </div>
  );
};

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
    // Otherwise, state.auth will be an empty object, and state.auth.id will be falsy
    auth: state.auth,
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
