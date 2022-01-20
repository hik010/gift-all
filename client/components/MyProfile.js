import React from 'react';
import MyInfo from './parts/MyInfo';

const MyProfile = ({ auth }) => {
  return (
    <>
      <div className="page-title">My Profile</div>
      <MyInfo userData={auth} />
    </>
  );
};

export default MyProfile;
