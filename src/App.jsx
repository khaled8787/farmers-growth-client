import React from 'react';

import Navbar from './NavBar';
import Footer from './Footer';
import { Outlet } from 'react-router';
import { ToastContainer } from 'react-toastify';

const App = () => {
  return (
    <div className='min-h-screen flex flex-col'>
      <ToastContainer></ToastContainer>
      <Navbar />
      <main className='flex-1'>
        <Outlet></Outlet>
      </main>
      <Footer />
    </div>
  );
};

export default App;
