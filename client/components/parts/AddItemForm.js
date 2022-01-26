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
    switch (formType) {
      case 'Etsy / Google Shopping':
        return <SourceLinkForm/>;
      case 'custom':
        return <CustomItem formType={formType}/>;
      default:
        return ''
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
