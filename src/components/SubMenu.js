import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';

export const SidebarData = [
  {
    title: 'Containers',
    path: '#',
    icon: <FaIcons.FaDocker />,
    iconClosed: <AiIcons.AiOutlineDown />,
    iconOpened: <AiIcons.AiOutlineUp />,
    subNav: [
      {
        title: 'All Containers',
        path: '/containers/all',
        icon: <IoIcons.IoMdDoneAll />
      },
      {
        title: 'Active Containers',
        path: '/containers/active',
        icon: <IoIcons.IoMdPlay />
      },
      {
        title: 'Stopped Containers',
        path: '/containers/stopped',
        icon: <IoIcons.IoMdPause />
      }
    ]
  },
  {
    title: 'Images',
    path: '/images',
    icon: <FaIcons.FaImage />
  },
  {
    title: 'Stats',
    path: '/stats',
    icon: <FaIcons.FaChartLine />
  }
];
