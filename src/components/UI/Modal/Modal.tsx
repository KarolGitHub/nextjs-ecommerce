import { useRouter } from 'next/dist/client/router';
import React from 'react';
import { useGlobalState } from '../../../context/GlobalState';
import { deleteItem } from '../../../store/Actions';

const Modal: React.FC = () => {
  const { state, dispatch } = useGlobalState();
  const { modal, auth } = state;

  const router = useRouter();

  const submitHandler = () => {
    dispatch(deleteItem('ADD_TO_CART', modal.data, modal.id));
    dispatch({ type: 'ADD_MODAL', payload: {} });
  };
  return (
    <div>
      <div
        className="modal fade"
        id="Modal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5
                className="modal-title text-capitalize"
                id="exampleModalLabel">
                {modal.title}
              </h5>

              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>

            <div className="modal-body">Do you want to remove this item?</div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal">
                Cancel
              </button>

              <button
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={submitHandler}>
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
