import React from 'react';
import AddListForm from '../forms/AddList';
import DeleteList from '../forms/DeleteList';
import AddItemForm from './AddItemForm';

const Modal = ({ id, title, receiver }) => {
  const getModalContent = () => {
    switch (id) {
      case 'addItem':
        return <AddItemForm />;
      case 'deleteList':
        return <DeleteList />;
      case 'addList':
        return <AddListForm receiver={receiver}/>
      default:
        return 'none';
    }
  };

  return (
    <div className="modal fade" id={id} tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              {title}
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
            ></button>
          </div>
          <div className="modal-body">{getModalContent()}</div>
          {/* <div className="modal-footer"> */}
            {/* <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button> */}
            {/* <button type="button" className="btn btn-primary">
                Save changes
              </button> */}
          {/* </div> */}
        </div>
      </div>
    </div>
  );
};

export default Modal;
