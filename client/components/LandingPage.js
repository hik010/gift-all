import React from 'react';
import { useEffect } from 'react';

const LandingPage = ({ isLoggedIn }) => {
  useEffect(() => {
    const onScroll = (e) => {
     if(window.scrollY >= document.querySelector('#heading').offsetTop-30) {
       document.querySelector('#navbar').classList.add('bg-danger');
     } else {
      document.querySelector('#navbar').classList.remove('bg-danger');
     }
    };
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);
  return (
    <div className="landing-page">
      <img
        className="img-fluid"
        src="/images/homepage.jpeg"
        alt="home page"
      ></img>
      <div id="heading" className="position-absolute indented">
        <h1>
          Gifts for you & <br></br>your loved ones
        </h1>

        {isLoggedIn ? (
          <>
            <a className="btn btn-danger btn-lg" href="/dashboard">
              View My Lists
            </a>
          </>
        ) : (
          <>
            <a className="btn btn-danger btn-lg" href="/login">
              Start
            </a>
            <a className="ms-3" href="/signup">
              Sign Up
            </a>
          </>
        )}
      </div>

      {/* <h1>How To Use</h1> */}

    </div>
  );
};

export default LandingPage;
