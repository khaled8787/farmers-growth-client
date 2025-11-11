import React from 'react';

import Navbar from './NavBar';
import Footer from './Footer';
import { Outlet } from 'react-router';

const App = () => {
  return (
    <div>
      <Navbar />
      <main>
        <Outlet></Outlet>
      </main>
      <Footer />
    </div>
  );
};

export default App;
