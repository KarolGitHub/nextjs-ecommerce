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
      <text fill="#fff" x="5" y="47">
        Loading
      </text>
    </div>
  );
};

export default Spinner;
