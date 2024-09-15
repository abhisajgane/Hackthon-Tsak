// src/App.js
import React, { useState } from 'react';
import './app.css';
import Navigation from './navigation/Navigation';
import Sidebar from './component/Sidebar';
import { useLocation } from 'react-router-dom';

const App = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    const isLoginPage = location.pathname === '/';

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
            <div className={`app ${isOpen ? 'sidebar-open' : ''}`}>
                {
                !isLoginPage 
                &&
                <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
              }
                <div className={`content ${isOpen ? 'shifted' : ''}`}>
                    <Navigation />
                </div>
            </div>
    );
};

export default App;
