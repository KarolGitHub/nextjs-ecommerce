import React from 'react';

type Props = {
  msg: { title: string; desc: string };
  closed: () => void;
  bgColor: string;
};

const Toast: React.FC<Props> = ({ msg, closed, bgColor }) => {
  return (
    <div
      className={`toast show position-fixed text-light ${bgColor}`}
      role="alert"
      aria-live="assertive"
      aria-atomic="true">
      <div className={`toast-header ${bgColor} text-light`}>
        <strong className="me-auto text-light">{msg.title}</strong>
        <button
          type="button"
          className="btn-close text-light"
          data-bs-dismiss="toast"
          aria-label="Close"
          onClick={closed}>
          x
        </button>
      </div>
      <div className="toast-body">{msg.desc}</div>
    </div>
  );
};

export default Toast;
