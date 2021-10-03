import React from 'react';

const Placeholder: React.FC = () => {
  return (
    <div className="card m-2" aria-hidden="true">
      <svg
        className="bd-placeholder-img card-img-top product-thumbnail"
        width="100%"
        height="180"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Placeholder"
        preserveAspectRatio="xMidYMid slice"
        focusable="false">
        <rect width="100%" height="100%" fill="#868e96"></rect>
      </svg>
      <div className="card-body">
        <h5 className="card-title placeholder-glow">
          <span className="placeholder col-6" />
        </h5>
        <p className="card-text placeholder-glow">
          <span className="placeholder col-7" />
          <span className="placeholder col-5" />
          <span className="placeholder col-7" />
          <span className="placeholder col-5" />
          <span className="placeholder col-7" />
          <span className="placeholder col-5" />
        </p>
        <div
          className="row justify-content-between mx-0"
          style={{ marginTop: '2.6rem' }}>
          <a
            href="#"
            tabIndex={-1}
            className="btn btn-primary disabled placeholder"
            style={{ marginRight: '5px', flex: 1 }}
          />
          <a
            href="#"
            tabIndex={-1}
            className="btn btn-success disabled placeholder"
            style={{ marginRight: '5px', flex: 1 }}
          />
        </div>
      </div>
    </div>
  );
};

export default Placeholder;
