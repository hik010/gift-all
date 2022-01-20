import React from 'react';
import { useDispatch } from 'react-redux';
import { connect } from 'react-redux';
import { Navigate } from 'react-router';
import { authenticate } from '../../store';

/**
 * COMPONENT
 */
const AuthForm = (props) => {
  const { name, displayName, error } = props;
  const dispatch = useDispatch();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const formName = evt.target.name;
    const email = evt.target.email.value;
    const password = evt.target.password.value;
    dispatch(authenticate(email, password, formName));
  };

  return (
    <div id='auth-form' className='position:fixed'>
      <img
        src="/images/authpage.jpeg"
        className="img-fluid position-fixed"
        alt="gift"
      ></img>

      <form
        onSubmit={handleSubmit}
        name={name}
        className="pt-3 card"
      >
        <h1 className='m-auto'>{name}</h1>
        <div>
          <label htmlFor="email" className='form-label'>
            Email
          </label>
          <input name="email" type="text" placeholder='example@gmail.com' className='form-control'/>
        </div>
        <div>
          <label htmlFor="password" className='form-label'>
          Password
          </label>
          <input name="password" type="password" placeholder='Password' className='form-control'/>
        </div>
        <div className='m-auto'>
          <button type="submit" className='btn btn-success'>{displayName}</button>
        </div>
        {error && error.response && <div> {error.response.data} </div>}
      </form>
    </div>
  );
};

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = (state) => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.auth.error,
  };
};

const mapSignup = (state) => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.auth.error,
  };
};

// const mapDispatch = (dispatch) => {
//   return {
//     handleSubmit(evt) {
//       evt.preventDefault();
//       const formName = evt.target.name;
//       const email = evt.target.email.value;
//       const password = evt.target.password.value;
//       dispatch(authenticate(email, password, formName));
//     },
//   };
// };

export const Login = connect(mapLogin)(AuthForm);
export const Signup = connect(mapSignup)(AuthForm);
