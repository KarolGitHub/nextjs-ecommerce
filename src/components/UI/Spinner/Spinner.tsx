import React from 'react';

const Spinner: React.FC = () => {
  return (
    <div
      className="position-fixed w-100 h-100 text-center loading"
      style={{
        background: '#0008',
        color: 'white',
        top: 0,
        left: 0,
        zIndex: 9,
      }}>
      <svg width="205" height="250" viewBox="25 25 50 50">
        <circle cx="50" cy="50" r="20" fill="none" strokeWidth="2" />
      </svg>
    </div>
  );
};

export default Spinner;
