import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addItemThunk } from '../../store/singleList';
import SingleItem from '../parts/SingleItem';

const SourceLinkForm = ({ formType }) => {
  let [data, setData] = useState({ link: '' });
  let dispatch = useDispatch();

  const handleChange = (event) => {
    setData({ [event.target.name]: event.target.value });
  };

  const fetchData = async (formType, link) => {
    try {
      let { data } = await axios.get(`/api/${formType.toLowerCase()}`, {
        headers: {
          link,
        },
      });
      setData(data);
    } catch (e) {
      console.error('error in fetchData', fetchData);
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
        className="btn btn-primary"
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
