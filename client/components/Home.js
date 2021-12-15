import React from 'react';
import { connect } from 'react-redux';
import MyInfo from './MyInfo';
import MyWishlist from './MyWishlist';
/**
 * COMPONENT
 */
export const Home = (props) => {
  const { auth } = props;

  return (
    <div>
      <h3>My Dashboard</h3>
      <MyInfo userData={auth} />
      <MyWishlist></MyWishlist>
    </div>
  );
};

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapState)(Home);
