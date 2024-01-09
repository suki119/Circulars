import React, { useState } from 'react';
import { Layout } from 'antd';
import { ConfigProvider, theme, Result, Button } from 'antd';
import { BrowserRouter as Router, Route, Switch, Redirect, useLocation } from 'react-router-dom';
import Sidebar from '../sidebar';
import AllCircularsSidebar from '../allCircularsSideBar/sidebar';
import AppHeader from '../Hedder/Header';
import AppFooter from '../Footer/Footer';

import CustomRoute from '../../utils/CustomRoute ';
import '../../styles/variables.css';
import { mainRoutes } from '../../routes/Route';
import { useEffect } from 'react';
import Login from '../../pages/Login';
import LandingPage from '../../pages/LandingPage';
import { authService } from '../../services/AuthService';
import { currentUserRoutes } from '../../routes/Route';
import Cookies from 'js-cookie';


function LoginLayout() {
  return (
    <Login />
  )
}

function NotFoundPage() {
  const route = window.location.pathname;

  useEffect(() => {
    if (route == "/landing") {
      window.location.pathname = "/login"
    }

  }, [])

  const goBack = () => {
    window.location.pathname = "/landing";
  };

  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist or You dont have permission."
      extra={
        <Button style={{ backgroundColor: 'var(--theam-color)' }} type="primary" onClick={goBack}>
          Go Back
        </Button>
      }
      style={{ marginTop: '50px' }}
    />
  );
};

function HomePage({
  location,
  collapsed,
  isDarkMode,
  setSelectedDivision,
  setCollapsed,
  setIsDarkMode,
  selectedDivision,

}) {
 
  const [currentUse, setCurrentUser] = useState('');
  const screenHeight = window.innerHeight - 175;

  

  useEffect(() => {
   
    if (!localStorage.getItem("U#T")) {
      window.location.pathname = "/login"
    }
  }, [localStorage.getItem("U#T")])


  return (
    <Layout>
      {location.pathname == '/allCirculars' ?
        <AllCircularsSidebar
          collapsed={collapsed}
          isDarkMode={isDarkMode}
          setSelectedDivision={setSelectedDivision}
        />
        :
        <Sidebar collapsed={collapsed} isDarkMode={isDarkMode} />}


      <Layout className="site-layout" style={{ marginLeft: collapsed ? 80 : 260 }}>

        <AppHeader
          collapsed={collapsed}
          onToggleCollapse={() => setCollapsed(!collapsed)}
          onToggleDarkMode={(value) => setIsDarkMode(value)}

        />


        <div style={{
          margin: '5px 16px',
          minHeight: screenHeight
        }}>
          <Switch>
            {currentUserRoutes().map((route, index) => (
              <CustomRoute
                key={index}
                exact
                path={route.path}
                component={route.component}
                isDarkMode={isDarkMode}
                collapsed={collapsed}
                selectedDivision={selectedDivision}
              />
            ))}
          </Switch>
        </div>


        <AppFooter />
      </Layout>
    </Layout>
  )
}

const MasterPage = () => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedDivision, setSelectedDivision] = useState('');
  const route = window.location.pathname;
  const { defaultAlgorithm, darkAlgorithm } = theme;




  function pageRender() {
    const route = window.location.pathname;

    switch (route) {
      case '/login':
        return <LoginLayout />;
        break
      case '/':
        return <LoginLayout />;
        break
      case '/landing':
      
        if (authService.getCurrentUser()) {
          return <LandingPage />;
        } else {
       
          <NotFoundPage />
        }
        

      default:
        // Check if the route is in mainRoutes based on the path property
        const isDashboardRoute = currentUserRoutes().some(mainRoute => mainRoute.path === route);

        return (
          isDashboardRoute ? (
            <HomePage
              isDarkMode={isDarkMode}
              location={location}
              collapsed={collapsed}
              selectedDivision={selectedDivision}
              setSelectedDivision={setSelectedDivision}
              setCollapsed={setCollapsed}
              setIsDarkMode={setIsDarkMode}


            />
          ) : (
            <NotFoundPage />
          )
        );
    }
  }


  let children = pageRender();


  return (

    <ConfigProvider theme={{
      algorithm: isDarkMode && route != '/landing' ? darkAlgorithm : defaultAlgorithm,
    }}>
      {children}
    </ConfigProvider>
  );
};

export default MasterPage;
