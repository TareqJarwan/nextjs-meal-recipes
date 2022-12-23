// Packages
import React from 'react';

// Components
import Footer from './Footer';
import Navbar from './Navbar';

// Styles
import classes from '../../styles/Layout.module.scss';

function Layout({ children }) {
  return (
    <>
      <div className={classes.container}>
        <Navbar />
        {children}
      </div>

      <Footer />
    </>
  );
}

export default Layout;
