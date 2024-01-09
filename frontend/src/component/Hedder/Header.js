import React, { useState } from 'react';
import { Layout, Button } from 'antd';
import logoimgwording from '../../images/logo2.png'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  BulbOutlined,
  LogoutOutlined
} from '@ant-design/icons';
import { authService } from '../../services/AuthService'

const { Header } = Layout;

function AppHeader({ collapsed, onToggleCollapse, onToggleDarkMode, onLogOut }) {

  const screenWidth = window.innerWidth;
  const [isDarkMode, setDarkMode] = useState(false);
  const route = window.location.pathname;


  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!isDarkMode);
    onToggleDarkMode(!isDarkMode);
    // You can set your dark mode styles or theme here
    if (!isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  };

  const onLogOutBtnClic = () => {
    authService.logout();;
    window.location.pathname = "/login"
  }

  return (
    <Header style={{ textAlign: 'center', padding: 0, background: isDarkMode ? "#0e0d0d" : "#ffffff" }}>

      {route !== '/landing' ? (
        <>
        <div style={{float:'left'}}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={onToggleCollapse}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
          <Button
            type="text"
            icon={<BulbOutlined />}
            onClick={toggleDarkMode}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
          </div>
        </>
      ) : (
        <>


          <img src={logoimgwording} alt="Vector" style={{ width: screenWidth >= 768 ? '280px' : '250px', height: '90%', padding: '10px', float: "left" }} />
          <span style={{ fontWeight: '600', display: screenWidth <= 900 && 'none' , fontSize:'25px' , color:'var(--theam-color)' }}>National Environmental Information Center</span>
        </>
      )}

      <div style={{ float: 'right' }}>
        <Button
          type="text"
          icon={<LogoutOutlined />}
          onClick={onLogOutBtnClic}
          style={{
            fontSize: '16px',
            marginRight: '10px',
            height: 34,
            fontWeight:'600'
          }}
        >
          Log Out
        </Button>
      </div>

    </Header>
  );

}

export default AppHeader;
