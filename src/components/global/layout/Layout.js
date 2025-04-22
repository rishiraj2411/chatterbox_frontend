import React from 'react';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import './Layout.css';

const Layout = ({ children }) => {
    return (
        <div className="layout">
            <Header />
            <div className="content">{children}</div>
            <Footer />
        </div>
    );
};

export default Layout;