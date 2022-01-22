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
    let before = document.querySelector(`span[title=${receiver}]`);
    let chosen = document.querySelector(`span[title=${e.target.title}]`)
    before.classList.remove('chosen')
    setReceiver(e.target.title);
    chosen.classList.add('chosen');

  };

  return (
    <div>
      <div className="page-title">My Dashboard</div>
      <section
        className="d-flex justify-content-center mt-4"
        style={{ gap: '50px' }}
      >
        <span
          onClick={changeReceiver}
          className='fs-4 px-2 chosen'
          title="me"
        >
          For Me
        </span>
        <span onClick={changeReceiver} className='fs-4 px-2' title="others">
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
