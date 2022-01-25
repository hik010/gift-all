import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { changeAuth } from '../../store';

const MyInfo = ({ userData }) => {
  const [formState, setFormState] = useState(userData);
  const [readState, setRead] = useState(true);
  const dispatch = useDispatch()

  const handleChange = (event) => {
    setFormState({...formState, [event.target.name]: event.target.value})
  }

  const handleClick = (event) => {
    if (event.target.id === 'edit') setRead(!readState)
    else {
      // submission
      dispatch(changeAuth(formState))
      setRead(!readState)

    }
  }

  return (
    <div className="my-info indented mt-5 d-flex flex-md-row flex-column align-items-center">
      <img
        src={formState.image}
        className="img-fluid border rounded-circle"
        alt="profile pic"
      ></img>
      <form className="ms-5 flex-grow-1">
        <div className="mb-3 row">
          <label htmlFor="email" className="col-sm-2 col-form-label">
            Email
          </label>
          <div className="col-sm-4">
            <input
              type="text"
              readOnly={readState}
              className={readState ? 'form-control-plaintext' : 'form-control'}
              id="email"
              name="email"
              value={formState.email}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="mb-3 row">
          <label htmlFor="fav_color" className="col-sm-2 col-form-label">
            Favorite Color
          </label>
          <div className="col-sm-4">
            <input
              type="fav_color"
              readOnly={readState}
              className={readState ? 'form-control-plaintext' : 'form-control'}
              id="fav_color"
              name="fav_color"
              value={formState.fav_color ? formState.fav_color : ''}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="mb-3 row">
          <label htmlFor="hobby" className="col-sm-2 col-form-label">
            Hobby
          </label>
          <div className="col-sm-4">
            <input
              type="hobby"
              readOnly={readState}
              className={readState ? 'form-control-plaintext' : 'form-control'}
              id="hobby"
              name="hobby"
              value={formState.hobby ? formState.hobby : ''}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="mb-3 row">
          <label htmlFor="birthday" className="col-sm-2 col-form-label">
            Birthday
          </label>
          <div className="col-sm-4">
            <input
              type="birthday"
              readOnly={readState}
              className={readState ? 'form-control-plaintext' : 'form-control'}
              id="birthday"
              name="birthday"
              value={formState.birthday ? formState.birthday : ''}
              onChange={handleChange}
            />
          </div>
        </div>

        <button type="button" className="btn btn-warning" onClick={handleClick}
        id={readState ? 'edit' : 'save'}>
          {readState ? 'Edit' : 'Save'}
        </button>
      </form>
    </div>
  );
};

export default MyInfo;
