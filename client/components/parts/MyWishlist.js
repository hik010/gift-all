import React, { useEffect} from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getAllLists } from '../../store/allLists';
import {
  clearSingleList,
  getSingleList,
} from '../../store/singleList';
import Modal from './Modal';
import SingleList from './SingleList';

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
      dispatch(getSingleList(chosenList));
    } else if (event.target.id === 'top-bar' || event.target.id === 'item-name') {
      dispatch(clearSingleList());
    }
  };

  return (
    <div className="my-wishlist mx-5 mt-5">
      {JSON.stringify(allLists) !== '{}' ? (
        <section className="lists-container">
          {allLists.map((list) => (
            <SingleList key={list.id} list={list} clickCard={clickCard} />
          ))}
          <button
          className="btn btn-success"
          type="button"
          data-bs-toggle="modal"
          data-bs-target="#addList"
        >
          Add new List
        </button>
        </section>
      ) : null}
      <Modal id='addItem' title='Add an item'/>
      <Modal id='deleteList' title='Delete this list'/>
      <Modal id='addList' title='Add a new list' receiver={receiver}/>
    </div>
  );
};



export default MyWishlist;
