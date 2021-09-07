import React from 'react';

import { Navbar, Footer, Popup, Modal } from '../..';

type Props = {
  children: React.ReactNode;
  className: string;
};

const BasicLayout: React.FC<Props> = ({ children, className }) => {
  return (
    <div className={`basic-layout ${className}`}>
      <Navbar />
      <Popup />
      <Modal />
      <div className="content">{children}</div>
      <Footer />
    </div>
  );
};

export default BasicLayout;
