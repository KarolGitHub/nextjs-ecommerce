import React from 'react';

import { Navbar, Footer } from '../..';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const BasicLayout = ({ children }) => {
  return (
    <div className="container">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};

export default BasicLayout;
