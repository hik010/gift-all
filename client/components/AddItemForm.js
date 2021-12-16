import axios from 'axios';
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

  const fetchData = async (formType, link) => {
    try {
      let { data } = await axios.get(`/api/${formType.toLowerCase()}`, {
        headers: {
          link,
        },
      });
      console.log(data);
      // data scraped, display it
    } catch (e) {
      console.error('error in fetchData', fetchData);
    }
  };

  const formFields = () => {
    switch (formType) {
      case 'Etsy':
        return <SourceLinkForm formType={formType} fetchData={fetchData} />;
      case 'Google Shopping':
        return <SourceLinkForm formType={formType} fetchData={fetchData} />;
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
