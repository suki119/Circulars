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
  


    const menuTittleList = [{
        title: 'Home',
        description: 'Home',
        icon: <DatabaseOutlined />,
        link:"/landing"

    }, {
        title: 'Circulars',
        description: 'Circulars',
        icon: <AppstoreOutlined />,
        link:"/allCirculars"

    }, {
        title: 'PDF Management',
        description: 'PDF Management',
        icon: <FilePdfOutlined />,
        link:"/pdfManage"

    }, {
        title: 'User Management',
        description: 'User Management',
        icon: <TeamOutlined />,
        link:"/userManage"

    }]


    const handleCardClick = (cardTitle) => {

       
    };

    return (
        <Layout>


            <Content style={{ padding: '50px', marginTop: '80px' }}>
                <Row gutter={[24, 24]} justify="center">

                    {menuTittleList.map((data, index) => (<Col xs={24} sm={12} md={12} lg={6} xl={6} >
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