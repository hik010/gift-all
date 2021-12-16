import React from 'react';

const SingleWishItem = ({item}) => {
  return (
    <div className="single-item d-flex" key={item.id}>
      <img style={{ width: '15%' }} src={item.image}></img>
      <section className="item-info ms-2 w-25">
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
export default SingleWishItem
