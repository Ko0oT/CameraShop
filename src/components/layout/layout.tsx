import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../footer/footer';
import Header from '../header/header';

function Layout() {
  return (
    <div className="wrapper">
      <Header />
      <main>
        <Outlet/>
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
