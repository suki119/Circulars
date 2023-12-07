import React, { useState } from 'react';
import { Menu } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { items } from './sidebarData';

function SidebarMenu({ isDarkMode }) {
  const location = useLocation();
  const [openKeys, setOpenKeys] = useState([]); // State to manage expanded submenus

  const handleOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
  };

  const onMenuClick = ({ key }) => {
    console.log("this is key",key)
    // If the clicked item doesn't have children, clear openKeys
    const selectedItem = items.find((item) => item.link === key);
    if (selectedItem && !selectedItem.children) {
      console.log("this selectedItem key",selectedItem)
      setOpenKeys([]);
    }
  };

  return (
    <Menu
      theme="dark"
      mode="inline"
      style={{ background: isDarkMode ? 'var(--content-container-bg-dark)' : '#064e47' }}
      defaultSelectedKeys={['1']}
      selectedKeys={[location.pathname]}
      openKeys={openKeys}
      onOpenChange={handleOpenChange}
      onClick={onMenuClick}
    >
      {items.map((item) =>
        item.children ? (
          <Menu.SubMenu key={item.key} icon={item.icon} title={item.label}>
            {item.children.map((child) => (
              <Menu.Item key={child.link} icon={child.icon}>
                <Link to={child.link}>{child.label}</Link>
              </Menu.Item>
            ))}
          </Menu.SubMenu>
        ) : (
          <Menu.Item key={item.link} icon={item.icon}>
            <Link to={item.link}>{item.label}</Link>
          </Menu.Item>
        )
      )}
    </Menu>
  );
}

export default SidebarMenu;
