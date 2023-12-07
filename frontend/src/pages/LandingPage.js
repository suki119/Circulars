import React, { useState, useEffect } from 'react';
import { Layout, Card, Row, Col } from 'antd';
import AppFooter from '../component/Footer/Footer';
import AppHeader from '../component/Hedder/Header';
import { ArrowRightOutlined, BankOutlined, DatabaseOutlined, AppstoreOutlined } from '@ant-design/icons';
import MenuCard from '../component/commonComponent/Cards/MenuCard';
import { authService } from '../services/AuthService'

const { Meta } = Card;
const { Content } = Layout;
function LandingPage() {
    const screenWidth = window.innerWidth;
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const currentUser = authService.getCurrentUser();




    const menuTittleList = [{
        title: 'QMS',
        description: 'QMS',
        icon: <DatabaseOutlined />,
        link: "/userUpload"

    }, {
        title: 'Dashboard',
        description: 'Dashboard',
        icon: <AppstoreOutlined />,
        link: "/dashboard"

    }, {
        title: 'Circulars',
        description: 'Circulars',
        icon: <AppstoreOutlined />,
        link: "/allCirculars"

    }]

    const handleCardClick = (cardTitle) => {

    };



    return (
        <Layout>
            <AppHeader />

            <Content style={{ padding: '40px', marginTop: '80px' }}>
                <Row gutter={[80, 32]} justify="center">
                    {currentUser?.qmsAccess === 'true' &&
                        <Col xs={24} sm={12} md={12} lg={6} xl={6}>
                            <MenuCard
                                title={menuTittleList[0].title}
                                description={menuTittleList[0].description}
                                icon={menuTittleList[0].icon}
                                onCardClick={handleCardClick}
                                link={menuTittleList[0].link}

                            />

                        </Col>}

                    {(currentUser?.position === 'admin' || currentUser?.position === 'editor') &&
                        <Col xs={24} sm={12} md={12} lg={6} xl={6}>
                            <MenuCard
                                title={menuTittleList[1].title}
                                description={menuTittleList[1].description}
                                icon={menuTittleList[1].icon}
                                onCardClick={handleCardClick}
                                link={menuTittleList[1].link}

                            />
                        </Col>}

                    <Col xs={24} sm={12} md={12} lg={6} xl={6}>
                        <MenuCard
                            title={menuTittleList[2].title}
                            description={menuTittleList[2].description}
                            icon={menuTittleList[2].icon}
                            onCardClick={handleCardClick}
                            link={menuTittleList[2].link}

                        />

                    </Col>
                </Row>
            </Content>
            <AppFooter />
        </Layout>
    );
}

export default LandingPage;
