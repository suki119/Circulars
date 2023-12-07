import React from 'react';
import {
  PieChartOutlined,
  DesktopOutlined,
  UserOutlined,
  TeamOutlined,
  FilePdfOutlined,
  AppstoreOutlined,
  HomeOutlined,
  BankOutlined
} from '@ant-design/icons';

const iconMapping = {
  'All Circulars': <AppstoreOutlined />,
  'PDF Upload': <FilePdfOutlined />,
  'PDF Manage': <FilePdfOutlined />,
  'Add User': <TeamOutlined />,
  'Logger': <TeamOutlined />,
  'Home': <HomeOutlined />,
  'Dashboard': <BankOutlined />
  // Add more mappings as needed
};

export const items = [
  {
    label: 'Home',
    key: '1',
    icon: iconMapping['Home'],
    link: '/landing',
  },
  {
    label: 'Dashboard',
    key: '2',
    icon: iconMapping['Dashboard'],
    link: '/dashboard',
  },
  {
    label: 'All Circulars',
    key: '3',
    icon: iconMapping['All Circulars'],
    link: '/allCirculars',
  },
  {
    label: 'PDF Management',
    key: '4',
    icon: iconMapping['PDF Upload'],
    children: [
      { label: 'PDF Upload', key: '1', link: '/pdfUpload', icon: iconMapping['PDF Upload'], },
      { label: 'PDF Manage', key: '2', link: '/pdfManage', icon: iconMapping['PDF Manage'], },
    ],
  },
  {
    label: 'User Management',
    key: '5',
    icon: iconMapping['Add User'],
    children: [
      { label: 'Add User', key: '1', link: '/userUpload', icon: iconMapping['Add User'], },
      { label: 'User Manage', key: '2', link: '/userManage', icon: iconMapping['Add User'], },
      { label: 'Logger', key: '3', link: '/add-product', icon: iconMapping['Logger'], },
    ],
  },
  // Add more menu items as needed
];
