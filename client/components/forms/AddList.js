import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

const AddListForm = ({receiver}) => {
  const emptyForm = {
    name: '',
    occasion: '',
    occurrence: '',
    color: '#000000',
    date: '',
    receiver
  }
  const [formData, setFormData] = useState(emptyForm)

  useEffect(() => {
    setFormData(emptyForm);
  },[receiver])

  const handleChange = (event) => {
    setFormData({...formData, [event.target.name]: event.target.value });
    console.log(event);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
    setFormData(emptyForm);
  };

  return (
    <form className="row" onSubmit={handleSubmit}>
      <div className="col-9 mb-3">
        <label htmlFor="name" className="form-label">
          Title
        </label>
        <input
          type="text"
          className="form-control"
          id="name"
          name="name"
          placeholder="Friend's 31st"
          onChange={handleChange}
          value={formData.name}
        />
      </div>
      <div className="col-3 mb-3">
        <label htmlFor="color" className="form-label">
          Color
        </label>
        <input
          type="color"
          id="color"
          name="color"
          className="form-control"
          onChange={handleChange}
          value={formData.color}
        />
      </div>
      <div className="col-md-4 mb-3">
        <label htmlFor="occasion" className="form-label">
          Occasion
        </label>
        <input
          className="form-control"
          list="datalistOptions"
          id="occasion"
          name="occasion"
          placeholder="misc"
          onChange={handleChange}
          value={formData.occasion}
        />
        <datalist id="datalistOptions">
          <option value="Birthdays"></option>
          <option value="Holidays"></option>
          <option value="Weddings"></option>
          <option value="Graduations"></option>
          <option value="Anniversaries"></option>
        </datalist>
      </div>
      <div className="col-md-5 mb-3">
        <label htmlFor="date" className="form-label">
          Date
        </label>
        <input
          type="date"
          name="date"
          className="form-control"
          id="date"
          onChange={handleChange}
          value={formData.date}
        />
      </div>
      <div className="col-md-3 mb-3">
        <label htmlFor="occurrence" className="form-label">
          Frequency
        </label>
        <select
          id="occurrence"
          name="occurrence"
          className="form-select mb-3"
          onChange={handleChange}
          value={formData.occurrence}
        >
          <option value="1">one-time</option>
          <option value="2">monthly</option>
          <option value="3">yearly</option>
        </select>
      </div>
      <button
        type="submit"
        className="btn btn-primary w-25 m-auto"
        data-bs-dismiss="modal"
      >
        Create
      </button>
    </form>
  );
};

export default AddListForm;
