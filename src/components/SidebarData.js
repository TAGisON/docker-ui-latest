import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';

export const SidebarData = [
  {
    title: 'Dashboard',
    path: '/',
    icon: <FaIcons.FaTachometerAlt color='#448EE4' />
  },
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
    path: '#',
    icon: <FaIcons.FaImage color='#448EE4' />,
    iconClosed: <AiIcons.AiOutlineDown />,
    iconOpened: <AiIcons.AiOutlineUp />,
    subNav: [
      {
        title: 'Active Images',
        path: '/images/active',
        icon: <IoIcons.IoMdPlay color='#448EE4' />
      },
      {
        title: 'System Images',
        path: '/images/system',
        icon: <IoIcons.IoMdAlbums color='#448EE4' />
      },
      {
        title: 'Import',
        path: '/images/import',
        icon: <IoIcons.IoMdCloudUpload color='#448EE4' />
      },
      {
        title: 'Export',
        path: '/images/export',
        icon: <IoIcons.IoMdCloudDownload color='#448EE4' />
      }
    ]
  },
  {
    title: 'Stats',
    path: '/stats',
    icon: <FaIcons.FaChartLine color='#448EE4' />
  }
];
