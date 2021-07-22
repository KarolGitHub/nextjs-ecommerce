import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer>
      Site developed by Karol Gardyjas &copy;{' '}
      {new Date().getFullYear().toString()}{' '}
    </footer>
  );
};

export default Footer;
