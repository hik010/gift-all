import axios from 'axios';
import React, { useState } from 'react';

const AddLinkForm = ({ formType, fetchData }) => {
  let [data, setData] = useState({ link: '' });

  const handleChange = (event) => {
    setData({ [event.target.name]: event.target.value });
  };

  return (
    <div className="form-floating mt-3">
      <input
        name="link"
        className="form-control"
        id="floatingInput"
        placeholder="name@example.com"
        value={data.link}
        onChange={handleChange}
      />
      <label htmlFor="floatingInput">{formType + ' Link'}</label>
      <button
        name={formType}
        className="btn btn-primary"
        onClick={() => fetchData(formType, data.link)}
      >
        Add
      </button>
    </div>
  );
};

const AddItemForm = () => {
  const [formType, setFormType] = useState('');

  const handleChange = (event) => {
    if (event.target.name === 'formType') {
      setFormType(event.target.value);
    }
  };

  const fetchData = async (name, link) => {
    try {
      let { data } = await axios.get(`/api/${name.toLowerCase()}`, {
        headers : {
          link
        }
      });
      // data scraped
    } catch (e) {
      console.error('error in fetchData', fetchData);
    }
  };

  const formFields = () => {
    switch (formType) {
      case 'Etsy':
        return <AddLinkForm formType={formType} fetchData={fetchData} />
      case 'Google Shopping':
        return 'google shopping form';
      case 'custom':
        return 'custom form';
    }
  };

  return (
    <>
      <div className="form-check form-check-inline">
        <input
          className="form-check-input"
          type="radio"
          name="formType"
          value="Etsy"
          onChange={handleChange}
        />
        <label className="form-check-label" htmlFor="inlineRadio1">
          Etsy
        </label>
      </div>
      <div className="form-check form-check-inline">
        <input
          className="form-check-input"
          type="radio"
          name="formType"
          value="Google Shopping"
          onChange={handleChange}
        />
        <label className="form-check-label" htmlFor="inlineRadio1">
          Google Shopping
        </label>
      </div>
      <div className="form-check form-check-inline">
        <input
          className="form-check-input"
          type="radio"
          name="formType"
          value="custom"
          onChange={handleChange}
        />
        <label className="form-check-label" htmlFor="inlineRadio2">
          Custom
        </label>
      </div>

      {formFields()}
    </>
  );
};

export default AddItemForm;
