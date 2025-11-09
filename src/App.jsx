import React from 'react';
import { Outlet } from 'react-router';

const App = () => {
  return (
    <div>
       <Outlet>
        hii
       </Outlet>
    </div>
  );
};

export default App;