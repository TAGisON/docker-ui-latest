import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';

export const SidebarData = [
  {
    title: 'Containers',
    path: '#',
    icon: <FaIcons.FaDocker color='#448EE4' />,
    iconClosed: <AiIcons.AiOutlineDown />,
    iconOpened: <AiIcons.AiOutlineUp />,
    subNav: [
      {
        title: 'All Containers',
        path: '/containers/all',
        icon: <IoIcons.IoMdDoneAll color='#448EE4' className='sidebar-icon' />
      },
      {
        title: 'Active Containers',
        path: '/containers/active',
        icon: <IoIcons.IoMdPlay color='#448EE4' />
      },
      {
        title: 'Stopped Containers',
        path: '/containers/stopped',
        icon: <IoIcons.IoMdPause color='#448EE4' />
      }
    ]
  },
  {
    title: 'Images',
    path: '/images',
    icon: <FaIcons.FaImage color='#448EE4' />
  },
  {
    title: 'Stats',
    path: '/stats',
    icon: <FaIcons.FaChartLine color='#448EE4' />
  }
];
