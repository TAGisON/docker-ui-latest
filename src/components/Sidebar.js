import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import Img from '../images/logo.png'
// import './Sidebar.css';

const Sidebar = () => {
  const [subnav, setSubnav] = useState({});

  const showSubnav = (index) => {
    setSubnav((prevState) => ({
      ...prevState,
      [index]: !prevState[index]
    }));
  };

  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <img src={Img} alt="Company Logo" />
      </div>
      <nav className="nav-menu">
        <ul className="nav-menu-items">
          {SidebarData.map((item, index) => (
            <li key={index} className={item.cName}>
              <Link to={item.subNav ? '#' : item.path} onClick={item.subNav ? () => showSubnav(index) : null}>
                {item.icon}
                <span>{item.title}</span>
                {item.subNav && subnav[index]
                  ? item.iconOpened
                  : item.subNav
                  ? item.iconClosed
                  : null}
              </Link>
              {item.subNav && subnav[index] &&
                item.subNav.map((subItem, subIndex) => (
                  <Link to={subItem.path} key={subIndex} className="sub-nav-link">
                    {subItem.icon}
                    <span>{subItem.title}</span>
                  </Link>
                ))}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
