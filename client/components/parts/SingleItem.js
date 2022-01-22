import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteItemThunk } from '../../store/singleList';

const SingleItem = ({ item }) => {

  const dispatch = useDispatch();
  const handleDelete = () => {
    console.log('delete clicked for', item);
    dispatch(deleteItemThunk(item));
  }

  return (
    <div
      className="single-item d-flex mt-2"
      style={{ width: '27vw' }}
      key={item.id}
    >
      <div className="w-50">
        <img className="w-100" src={item.image}></img>
      </div>
      <section className="item-info ms-2 w-50 position-relative">
        <a href={item.link} target="_blank" rel="noreferrer">
          <h5>{item.title}</h5>
        </a>
        <p id="price">${item.price}</p>
        <p id="rating">Star: {item.rating}</p>
        <p>{item.num_sales}</p>
        <button
          type="button"
          className="btn btn-sm delete-button"
          onClick={handleDelete}
        >
          <i className="bi-trash-fill delete-icon"></i>
        </button>
      </section>
    </div>
  );
};
export default SingleItem;
