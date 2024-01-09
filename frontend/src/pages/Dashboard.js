import React, { useState, useEffect } from 'react';
import { Layout, Card, Row, Col } from 'antd';

import AppHeader from '../component/Hedder/Header';
import { AppstoreOutlined, BankFilled, DatabaseOutlined, AppstoreFilled, FilePdfOutlined, TeamOutlined } from '@ant-design/icons';
import MenuCard from '../component/commonComponent/Cards/MenuCard';
import { authService } from '../services/AuthService'

const { Meta } = Card;
const { Content } = Layout;
function Dashboard({ isDarkMode }) {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const currentUser = authService.getCurrentUser();
    const [filterdRoles, setFilterdRoles] = useState([]);


    const menuTittleList = [{
        title: 'Home',
        description: 'Home',
        icon: <DatabaseOutlined />,
        link: "/landing",
        roles: ['admin', 'editor', 'user']

    }, {
        title: 'Circulars',
        description: 'Circulars',
        icon: <AppstoreOutlined />,
        link: "/allCirculars",
        roles: ['admin', 'editor', 'user']

    },,{
        title: 'QMS',
        description: 'User Profile',
        icon: <AppstoreOutlined />,
        link: "/allQmsCirculars",
        roles: ['admin', 'editor', 'user']

    }, {
        title: 'PDF Management',
        description: 'PDF Management',
        icon: <FilePdfOutlined />,
        link: "/pdfManage",
        roles: ['admin', 'editor']

    }, {
        title: 'User Management',
        description: 'User Management',
        icon: <TeamOutlined />,
        link: "/userManage",
        roles: ['admin', 'editor']

    }, {
        title: 'User Profile',
        description: 'User Profile',
        icon: <TeamOutlined />,
        link: "/userProfile",
        roles: ['admin', 'editor', 'user']

    }]

    useEffect(() => {

        const userRoles = currentUser.position
        const filterdRoles = menuTittleList.filter(menuTittle => {
            if (menuTittle.link === '/allQmsCirculars') {
                if (currentUser.qmsAccess === 'true') {
                  return true
                } else {
                  return false
                }
            }
            else if (menuTittle.link === '/allCirculars') {
                if (currentUser.circularsAccess === 'true') {
                  return true
                } else {
                  return false
                }
              }
            else if (Array.isArray(menuTittle.roles)) {
                for (const role of menuTittle.roles) {
                    if (userRoles.includes(role)) {
                        return true;
                    }
                }
            }
            return false;
        })
        setFilterdRoles(filterdRoles);

    }, [])


    const handleCardClick = (cardTitle) => {


    };

    return (
        <Layout>


            <Content style={{ padding: '50px', marginTop: '20px' }}>
                <Row gutter={[24, 24]} justify="start">

                    {filterdRoles.map((data, index) => (<Col xs={24} sm={12} md={12} lg={6} xl={6} >
                        <MenuCard
                            title={data.title}
                            description={data.description}
                            icon={data.icon}
                            onCardClick={handleCardClick}
                            link={data.link}
                            isDarkMode={isDarkMode}
                        />

                    </Col>))}



                </Row>
            </Content>

        </Layout>
    );
}

export default Dashboard;