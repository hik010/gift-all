import React, { useState } from 'react';
import SourceLinkForm from './forms/SourceLink';
import SourceSelectForm from './forms/SourceSelect';

const AddItemForm = () => {
  const [formType, setFormType] = useState('');

  const handleChange = (event) => {
    if (event.target.name === 'formType') {
      setFormType(event.target.value);
    }
  };


  const formFields = () => {
    switch (formType) {
      case 'Etsy':
        return <SourceLinkForm formType={formType} />;
      case 'Google Shopping':
        return <SourceLinkForm formType={formType} />;
      case 'custom':
        return 'custom form';
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
