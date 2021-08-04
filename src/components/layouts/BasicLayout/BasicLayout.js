import React from 'react';

import { Navbar, Footer } from '../..';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const BasicLayout = ({ children, className }) => {
  return (
    <div className={`basic-layout ${className}`}>
      <Navbar />
      <div className="content">{children}</div>
      <Footer />
    </div>
  );
};

export default BasicLayout;
