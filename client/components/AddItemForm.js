import React, { useState } from 'react';

const AddItemForm = () => {
  const [formType, setFormType] = useState('');

  const handleChange = (event) => {
    if (event.target.name === 'formType') {
      setFormType(event.target.value);
    }
    console.log(formType);
  };

  const formFields = () => {
    switch (formType) {
      case 'Etsy':
        return (<div className="form-floating mt-3">
        <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com"/>
        <label htmlFor="floatingInput">{formType + ' Link'}</label>
        <button name={formType} className='btn btn-primary'>Add</button>
      </div>);
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
