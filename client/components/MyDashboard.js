import React from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { connect } from 'react-redux';
import MyWishlist from './parts/MyWishlist';
/**
 * COMPONENT
 */
export const MyDashboard = (props) => {
  const {auth} = props;

  useEffect(() => {
    console.log('renderred dashboard')
  },[])

  return (
    <div>
      <div className='page-title' >My Dashboard</div>
      {auth && (
        <>
          <MyWishlist></MyWishlist>
        </>
      )}
    </div>
  );
};

/**
 * CONTAINER
 */
// const mapState = (state) => {
//   console.log(state);
//   return {
//     auth: state.auth,
//   };
// };

export default MyDashboard;
