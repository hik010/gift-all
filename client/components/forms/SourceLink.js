import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addItemThunk } from '../../store/singleList';
import SingleItem from '../parts/SingleItem';

const SourceLinkForm = () => {
  let [data, setData] = useState({ link: '' });
  let [formType, setFormType] = useState('');
  let dispatch = useDispatch();

  const handleChange = (event) => {
    if (event.target.name === 'link') {
      let product_link = event.target.value;
      if (product_link.includes('etsy.com/listing')) {
        setFormType('Etsy');
      } else if (product_link.includes('google.com/shopping/product')) {
        setFormType('Google Shopping');
      } else if (product_link.includes('amazon.com')) {
        setFormType('Amazon');
      } else {
        setFormType('Invalid');
      }
    }
    setData({ [event.target.name]: event.target.value });
  };

  const fetchData = async (formType, link) => {
    try {
      // console.log('link type ', formType);
      let { data } = await axios.get(`/api/scrape`, {
        headers: {
          link,
          formtype: formType,
        },
      });
      setData(data);
    } catch (e) {
      console.error('error in fetchData', e);
    }
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

      {data.title && <SingleItem item={data} />}

      <button
        name={formType}
        className="btn btn-primary mt-3"
        onClick={() => {
          if (!data.title) fetchData(formType, data.link);
          else {
            //  actually add to wishlist
            delete data['num_sales'];
            dispatch(addItemThunk(data));
            setData({ link: '' });
          }
        }}
      >
        {!data.title ? 'Fetch Item' : 'Add'}
      </button>
    </div>
  );
};

export default SourceLinkForm;
