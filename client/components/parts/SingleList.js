import React from 'react';
import { useSelector } from 'react-redux';
import SingleItem from './SingleItem';

const SingleList = ({ list, clickCard }) => {
  return (
    <div
      className="list-card position-relative"
      key={list.id}
      onClick={(event) => clickCard(event, list)}
    >
      <div id="top-bar">
        <h4 className="d-inline" id='item-name'>
          {list.name}
        </h4>
        {list.date && (
          <span className="date-tag">{list.date.toString().slice(0, 10)}</span>
        )}
      </div>

      <ListContent list={list} />
    </div>
  );
};

const ListContent = ({ list }) => {
  const singleList = useSelector((state) => state.singleList);
  if (singleList.id !== list.id) return '';

  return (
    <>
      {singleList.items.length !== 0 ? (
        <div className="list-items mt-3 d-flex flex-wrap justify-content-start">
          {singleList.items.map((item) => (
            <SingleItem key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <div className="mt-2"> No items here. </div>
      )}
      <div className="buttons-group">
        <button
          className="btn bg-success"
          type="button"
          data-bs-toggle="modal"
          data-bs-target="#addItem"
        >
          Add
        </button>
        <button
          className="btn bg-danger"
          type="button"
          data-bs-toggle="modal"
          data-bs-target="#deleteList"
        >
          Delete
        </button>
      </div>
    </>
  );
};

export default SingleList;
