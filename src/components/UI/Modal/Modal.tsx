import React from 'react';

import { useGlobalState } from '../../../context/GlobalState';
import Spinner from '../Spinner';
import Toast from '../Toast';

const Modal: React.FC = () => {
  const { state, dispatch } = useGlobalState();
  const { notify } = state;
  const closeHandler = () => dispatch({ type: 'NOTIFY', payload: {} });

  return (
    <React.Fragment>
      {notify.loading && <Spinner />}
      {notify.error && (
        <Toast
          msg={{ desc: notify.error, title: 'Error' }}
          closed={closeHandler}
          bgColor="bg-danger"
        />
      )}
      {notify.success && (
        <Toast
          msg={{ desc: notify.success, title: 'Success' }}
          closed={closeHandler}
          bgColor="bg-success"
        />
      )}
    </React.Fragment>
  );
};

export default Modal;
