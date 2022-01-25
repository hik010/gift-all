import React from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { deleteListThunk } from '../../store/allLists';

const DeleteList = () => {
  const singleList = useSelector((state) => state.singleList);
  const dispatch = useDispatch();
  return (
    <>
      <p>
        Are you sure you want to delete <strong>{singleList.name}</strong>?
      </p>
      <small style={{ color: '#b43509', display: 'block' }}>
        note: items in list will also be deleted together
      </small>
      <button
        className="btn btn-danger mt-3"
        data-bs-dismiss="modal"
        onClick={() => {
          console.log('clicked', singleList);
          dispatch(deleteListThunk(singleList));
        }}
      >
        Delete
      </button>
    </>
  );
};

export default DeleteList;
