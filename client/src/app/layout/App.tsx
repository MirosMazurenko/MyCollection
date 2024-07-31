/* eslint-disable react-refresh/only-export-components */
import { Outlet, useLocation } from 'react-router-dom';
import HomePage from '../../features/home/HomePage'
import Header from './Header'
import Footer from './Footer';
import React from 'react';
import withRoot from '../theme/withRoot';

function App() {
  const location = useLocation();

  return (
    <React.Fragment>
      <Header />
      {location.pathname === '/' ? <HomePage /> : <Outlet />}
      <Footer />
    </React.Fragment>
  )
}

export default withRoot(App);
