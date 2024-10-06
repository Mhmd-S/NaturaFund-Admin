import React from 'react';
import { ToastContainer } from 'react-toastify';

import AppRouter from '@routes/AppRouter';

import Nav from '@modules/Nav';
import Header from '@modules/HeaderModule';

const App = () => {
  return (
    <div className="relative">
      <div className="w-screen h-screen grid grid-cols-[20%_80%] grid-flow-row divide-x divide-y">
        <Header />
        <Nav />

        <AppRouter />
      </div>
      <ToastContainer />
    </div>
  );
};

export default App;
