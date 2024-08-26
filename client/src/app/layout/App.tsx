/* eslint-disable react-refresh/only-export-components */
import { Outlet, useLocation } from 'react-router-dom';
import HomePage from '../../features/home/HomePage';
import Header from './Header';
import Footer from './Footer';
import React, { useCallback, useEffect, useState } from 'react';
import withRoot from '../theme/withRoot';
import { useAppDispatch } from '../store/configureStore';
import { fetchCurrentUser } from '../../features/account/accountSlice';
import { fetchGameCollectionAsync } from '../../features/gameCollection/gameCollectionSlice';
import LoadingComponent from './LoadingComponent';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

function App() {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);
  const isAuthPage = location.pathname === '/sign-in' || location.pathname === '/register';

  const initApp = useCallback(async () => {
    try {
      await dispatch(fetchCurrentUser());
      await dispatch(fetchGameCollectionAsync());
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  useEffect(() => {
    initApp().then(() => setLoading(false))
  }, [initApp])

  if (loading) {
    return <LoadingComponent />;
  }

  return (
    <React.Fragment>
      <ToastContainer position='bottom-right' hideProgressBar theme='colored' />
      {!isAuthPage && <Header />}
      {location.pathname === '/' && <HomePage />}
      <Outlet />
      {!isAuthPage && <Footer />}
    </React.Fragment>
  );
}

export default withRoot(App);