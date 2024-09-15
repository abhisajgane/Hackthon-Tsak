// src/components/Sidebar.js
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css';
import home from "../assets/images/home.png";
import state from "../assets/images/map.png";
import city from "../assets/images/skyline.png";
import warehouse from "../assets/images/warehouse.png";
import active from "../assets/images/current.png";
import inactive from "../assets/images/play.png";

const Sidebar = ({ isOpen, toggleSidebar }) => {
    const [activeTab, setActiveTab] = useState('/home');
    const location = useLocation();

    const handleTabClick = (tab) => {
        setActiveTab(tab);
        toggleSidebar();
    };

    const getArrowIcon = (tab) => {
        return activeTab === tab ? <img src={active} alt="Arrow" className="arrow-icon" /> : <img src={inactive} alt="Arrow" className="arrow-icon" />;
    };

    const shouldHideSidebar = location.pathname === '/';

    return (
        <>

            <div className={`sidebar ${isOpen ? 'open' : ''} ${shouldHideSidebar ? 'hidden' : ''}`}>

                <nav>

                    <ul>

                        <li className={activeTab === '/home' ? 'active' : ''}><Link to="/home" onClick={() => handleTabClick('/home')}>
                            <img src={home} alt="Home" className="icon" />
                            Home
                            {getArrowIcon('/home')}
                        </Link></li>
                        <li className={activeTab === '/state' ? 'active' : ''}><Link to="/state" onClick={() => handleTabClick('/state')}>
                            <img src={state} alt="State" className="icon" />
                            State
                            {getArrowIcon('/state')}
                        </Link></li>
                        <li className={activeTab === '/city' ? 'active' : ''}><Link to="/city" onClick={() => handleTabClick('/city')}>
                            <img src={city} alt="City" className="icon" />
                            City
                            {getArrowIcon('/city')}
                        </Link></li>
                        <li className={activeTab === '/warehouse' ? 'active' : ''}><Link to="/warehouse" onClick={() => handleTabClick('/warehouse')}>
                            <img src={warehouse} alt="Warehouse" className="icon" />
                            Warehouse
                            {getArrowIcon('/warehouse')}
                        </Link></li>
                    </ul>
                </nav>
            </div>
            <div className="hamburger" onClick={toggleSidebar}>
                &#9776;
            </div>
        </>
    );
};

export default Sidebar;
