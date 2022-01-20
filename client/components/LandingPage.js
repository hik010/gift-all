import React from 'react';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <img
        className="img-fluid position-absolute top-0 start-0"
        src="/images/homepage.jpeg"
        alt="home page"
      ></img>
      <div id="heading">
        <h1>
          Gifts for you & <br></br>your loved ones
        </h1>

        <a className="btn btn-danger btn-lg" href="/login">
          Start
        </a>
        <a className="ms-3" href="/signup">
          Sign Up
        </a>
      </div>
    </div>
  );
};

export default LandingPage;
