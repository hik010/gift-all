import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getAllLists } from '../../store/allLists';
import { getWishlist, setWishlist } from '../../store/singleList';
import AddItemForm from '../AddItemForm';
import SingleWishItem from '../SingleWishItem';

const MyWishlist = ({ receiver }) => {
  const allLists = useSelector((state) => state.allLists);
  const singleList = useSelector((state) => state.singleList);
  const dispatch = useDispatch();

  // get all my lists (either for me or for others)
  useEffect(() => {
    dispatch(getAllLists(receiver));
  }, [receiver]);

  // once allLists loads -> expand first list
  useEffect(() => {
    if (Object.keys(singleList).length !== 0) return;
    allLists.length > 0 && dispatch(setWishlist(allLists[0]));
  }, [allLists.length]);

  const clickCard = (event) => {
    if (event.target.classList.contains('list-card')) {
      let selectedIndex = event.target.dataset.listIndex;
      // reveal items now
      dispatch(setWishlist(allLists[selectedIndex]));
    }
  };

  return (
    <div className="my-wishlist mx-5 mt-5">
      {JSON.stringify(allLists) !== '{}' ? (
        <section className="lists-container">
          {allLists.map((list, index) => (
            <div
              className="list-card position-relative"
              key={list.id}
              data-list-index={index}
              onClick={clickCard}
            >
              <h4 className="d-inline">{list.name}</h4>
              {list.date && (
                <span className="date-tag">
                  {list.date.toString().slice(0, 10)}
                </span>
              )}

              <ListItems list={list} index={index} />
            </div>
          ))}
        </section>
      ) : null}
      <AddModal />
    </div>
  );
};

const ListItems = ({ list, index }) => {
  const singleList = useSelector((state) => state.singleList);
  if (singleList.id !== list.id) return '';

  return (
    <>
      {singleList.items.length !== 0 ? (
        <div className="list-items d-flex mt-3 justify-content-start">
          {singleList.items.map((item) => (
            <SingleWishItem key={item.id} item={item} />
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
          data-list-index={index}
          // onClick={clickButton}
        >
          Add
        </button>
        <button
          className="btn bg-danger"
          type="button"
          data-bs-toggle="modal"
          data-bs-target="#deleteItem"
          data-list-index={index}
          // onClick={clickButton}
        >
          Delete
        </button>
      </div>
    </>
  );
};

const AddModal = () => {
  return (
    <div className="modal fade" id="addItem" tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Add an Item
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
            ></button>
          </div>
          <div className="modal-body">
            <AddItemForm />
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            {/* <button type="button" className="btn btn-primary">
                Save changes
              </button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyWishlist;
