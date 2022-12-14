import React from 'react';
import Head from 'next/head';
import Navbar from './Navbar';
import Footer from './Footer';
import FooterBanner from './FooterBanner';


const Layout = ({children}) => {
  return (
    <div className='layout'>
      <Head>
        <title>Capman's Gadget Store</title>
        <meta name="description" content="Get your original iphones and other gadgets" />       
      </Head>
      <header>
        <Navbar/>
      </header>
      <main>
        {children}
      </main>
      
      <Footer/>
    </div>
  )
}

export default Layout