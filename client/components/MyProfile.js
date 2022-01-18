import React from 'react';
import MyInfo from './parts/MyInfo'

const MyProfile = ({auth}) => {
  return (
    <>
      <MyInfo userData={auth} />
    </>
  );
};

export default MyProfile;
