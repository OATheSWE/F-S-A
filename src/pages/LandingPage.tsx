import * as React from 'react';
import { Outlet } from "react-router-dom";
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';


const LandingPage: React.FC = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>


  )
};

export default LandingPage;

