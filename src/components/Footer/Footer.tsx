import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer>
      <h5>
        Site developed by Karol Gardyjas &copy;{' '}
        {new Date().getFullYear().toString()}{' '}
      </h5>
    </footer>
  );
};

export default Footer;
