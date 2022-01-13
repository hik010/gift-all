import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addItemThunk } from '../../store/single_wishlist';

const CustomItem = ({ formType }) => {
  let [data, setData] = useState({ title: '', price: '', link: '' });
  let dispatch = useDispatch();

  const handleChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  return (
    <>
      <div className="form-floating mt-3">
        <input
          name="title"
          className="form-control"
          id="title"
          value={data.title}
          onChange={handleChange}
        />
        <label htmlFor="title">Title</label>
      </div>
      <div className="form-floating mt-3">
        <input
          name="price"
          className="form-control"
          id="price"
          value={data.price}
          onChange={handleChange}
        />
        <label htmlFor="price">Price</label>
      </div>
      <div className="form-floating mt-3">
        <input
          name="link"
          className="form-control"
          id="link"
          value={data.link}
          onChange={handleChange}
        />
        <label htmlFor="link">Product Link</label>
      </div>

      {/* {data.title && <SingleWishItem item={data} />} */}
      <button
        name={formType}
        className="btn btn-primary"
        onClick={() => {
          dispatch(addItemThunk(data));
          setData({ title: '', price: '', link: '' });
          // }
        }}
      >
        Add
      </button>
    </>
  );
};

export default CustomItem;
