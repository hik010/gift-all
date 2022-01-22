import React, { useEffect} from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getAllLists } from '../../store/allLists';
import {
  clearSingleList,
  getSingleList,
  setSingleList,
} from '../../store/singleList';
import SingleItem from './SingleItem';
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
    } else if (event.target.id === 'top-bar') {
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
        </section>
      ) : null}
      <Modal id='addItem' title='Add an item'/>
      <Modal id='deleteList' title='Delete this list'/>
    </div>
  );
};

// const ListContent = ({ list }) => {
//   const singleList = useSelector((state) => state.singleList);
//   if (singleList.id !== list.id) return '';

//   return (
//     <>
//       {singleList.items.length !== 0 ? (
//         <div className="list-items d-flex mt-3 justify-content-start">
//           {singleList.items.map((item) => (
//             <SingleItem key={item.id} item={item} />
//           ))}
//         </div>
//       ) : (
//         <div className="mt-2"> No items here. </div>
//       )}
//       <div className="buttons-group">
//         <button
//           className="btn bg-success"
//           type="button"
//           data-bs-toggle="modal"
//           data-bs-target="#addItem"
//         >
//           Add
//         </button>
//         <button
//           className="btn bg-danger"
//           type="button"
//           data-bs-toggle="modal"
//           data-bs-target="#deleteList"
//         >
//           Delete
//         </button>
//       </div>
//     </>
//   );
// };

export default MyWishlist;
