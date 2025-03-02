import React from 'react';
import Header from './components/header/header.jsx'
import Footer from './components/footer/footer.jsx';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div>
      <Header />
      <div style={{minHeight : "80vh"}}>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
