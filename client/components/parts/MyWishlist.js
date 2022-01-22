import React, { useEffect} from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getAllLists } from '../../store/allLists';
import {
  clearWishlist,
  setWishlist,
} from '../../store/singleList';
import SingleWishItem from '../SingleWishItem';
import Modal from './AddModal';

const MyWishlist = ({ receiver }) => {
  const allLists = useSelector((state) => state.allLists);
  const singleList = useSelector((state) => state.singleList);
  const dispatch = useDispatch();

  // get all my lists (either for me or for others)
  useEffect(() => {
    async function loadLists() {
      await dispatch(getAllLists(receiver));
    }
    loadLists();
    // dispatch(setWishlist(allLists[0]));
  }, [receiver]);

  const clickCard = (event, chosenList) => {
    if (chosenList.id !== singleList.id) {
      dispatch(setWishlist(chosenList));
    } else if (event.target.id === 'top-bar') {
      dispatch(clearWishlist());
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
              onClick={(event) => clickCard(event, list)}
            >
              <div id="top-bar">
                <h4 className="d-inline">{list.name}</h4>
                {list.date && (
                  <span className="date-tag">
                    {list.date.toString().slice(0, 10)}
                  </span>
                )}
              </div>

              <ListContent list={list} index={index} />
            </div>
          ))}
        </section>
      ) : null}
      <Modal id='addItem' title='Add an item'/>
      <Modal id='deleteList' title='Delete this list'/>
    </div>
  );
};

const ListContent = ({ list, index }) => {
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

export default MyWishlist;
