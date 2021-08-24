import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-light text-center text-lg-start">
      <div
        className="text-center p-4"
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
        <h5>
          Site developed by Karol Gardyjas &copy;{' '}
          {new Date().getFullYear().toString()}{' '}
        </h5>
      </div>
    </footer>
  );
};

export default Footer;
