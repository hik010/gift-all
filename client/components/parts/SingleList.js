import React from 'react';
import { useSelector } from 'react-redux';
import SingleItem from './SingleItem';

const SingleList = ({ list, clickCard }) => {
  const singleList = useSelector((state) => state.singleList);
  return (
    <div
      className="list-card position-relative d-"
      key={list.id}
      onClick={(event) => clickCard(event, list)}
      onMouseOver={(event) => {
        console.log(event.target);
      }}
    >
      <div id="top-bar" className='d-flex flex-wrap align-items-center'>
        <h4 className="d-inline me-3 mb-0" id="item-name">
          {list.name}
        </h4>
        {list.date && (
          <span className="date-tag">{list.date.toString().slice(0, 10)}</span>
        )}
      </div>

      {/* only show the content if selected list */}
      {singleList.id === list.id && <ListContent selectedList={singleList} />}
    </div>
  );
};

const ListContent = ({ selectedList }) => {
  return (
    <>
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
      {selectedList.items.length !== 0 ? (
        <div className="list-items mt-3 d-flex flex-wrap justify-content-start">
          {selectedList.items.map((item) => (
            <SingleItem key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <div className="mt-3"> No items here. </div>
      )}

      {/* Notes section */}
      <footer>
        <label>Notes</label>code
        <textarea className="form-control">{selectedList.note}</textarea>
      </footer>
    </>
  );
};

export default SingleList;
