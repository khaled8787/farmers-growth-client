import React from 'react';

import Navbar from './NavBar';
import Footer from './Footer';
import { Outlet } from 'react-router';
import { ToastContainer } from 'react-toastify';

const App = () => {
  return (
    <div>
      <ToastContainer></ToastContainer>
      <Navbar />
      <main>
        <Outlet></Outlet>
      </main>
      <Footer />
    </div>
  );
};

export default App;
