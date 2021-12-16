import React, { useState } from 'react';

const AddItemForm = () => {
  const [formType, setFormType] = useState('');

  const handleChange = (event) => {
    if (event.target.name === 'formType'){
      setFormType(event.target.value);
    }
    console.log(formType)
  }

  const formFields = () => {
    switch (formType) {
      case 'etsy':
        return 'etsy form';
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
          id="inlineRadio1"
          value="etsy"
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
          id="inlineRadio2"
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
