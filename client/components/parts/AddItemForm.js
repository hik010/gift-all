import React, { useState } from 'react';
import CustomItem from '../forms/CustomItem';
import SourceLinkForm from '../forms/SourceLink';
import SourceSelectForm from '../forms/SourceSelect';

const AddItemForm = () => {
  const [formType, setFormType] = useState('');

  const handleChange = (event) => {
    if (event.target.name === 'formType') {
      setFormType(event.target.value);
    }
  };

  const formFields = () => {
    if(!formType) return;
    if (formType === 'custom') {
      return <CustomItem formType={formType}/>;
    } else {
      return <SourceLinkForm/>;
    }
  };

  return (
    <>
      <SourceSelectForm handleChange={handleChange} />
      {formFields()}
    </>
  );
};

export default AddItemForm;
