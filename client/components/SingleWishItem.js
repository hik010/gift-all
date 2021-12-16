import React from 'react';

const SingleWishItem = ({ item }) => {
  return (
    <div className="single-item d-flex mt-2" style={{width: '27vw'}} key={item.id}>
      <div className='w-50'>
        <img className='w-100' src={item.image}></img>
      </div>
      <section className="item-info ms-2 w-50">
        <a href={item.link} target="_blank">
          <h5>{item.title}</h5>
        </a>
        <p id="price">${item.price}</p>
        <p id="rating">Star: {item.rating}</p>
        <p>{item.num_sales}</p>
      </section>
    </div>
  );
};
export default SingleWishItem;
