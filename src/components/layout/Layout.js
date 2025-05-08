import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import GlobalStyle from '../../styles/GlobalStyle';

const Layout = ({ children }) => {
  return (
    <>
      <GlobalStyle />
      <Navbar />
      <main style={{ marginTop: '70px' }}>{children}</main>
      <Footer />
    </>
  );
};

export default Layout; 