import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { connect } from 'react-redux';
import MyWishlist from './parts/MyWishlist';
/**
 * COMPONENT
 */
export const MyDashboard = (props) => {
  const { auth } = props;
  const [receiver, setReceiver] = useState('me');

  const changeReceiver = (e) => {
    console.dir(e.target)
    console.log(e.target.title);
    setReceiver(e.target.title);
  };

  return (
    <div>
      <div className="page-title">My Dashboard</div>
      <section
        className="d-flex justify-content-center mt-4"
        style={{ gap: '50px' }}
      >
        <span onClick={changeReceiver} title="me">
          For Me
        </span>
        <span onClick={changeReceiver} title="others">
          For Others
        </span>
      </section>

      {auth && (
        <>
          <MyWishlist receiver={receiver}></MyWishlist>
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
