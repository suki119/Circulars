import React from 'react';
import { Layout, Row, Col, Typography, Space } from 'antd';
import { MailOutlined, PhoneOutlined, EnvironmentOutlined, FacebookOutlined, TwitterOutlined, LinkedinOutlined } from '@ant-design/icons';
import {companyDetails} from '../../enums/constants';
const { Footer } = Layout;
const { Text, Link } = Typography;

function AppFooter(props) {
    return (
        <Footer style={{ textAlign: 'center', padding: '20px 20px', marginTop: '20px' }}>
            {/* <Row gutter={[16, 16]} justify="center">
                <Col xs={24} sm={12} md={8} lg={8}>
                    <Space direction="vertical">
                        <Text strong>Contact Information</Text>
                        <Text><MailOutlined /> Email: <Link href="mailto:your.email@example.com">your.email@example.com</Link></Text>
                        <Text><PhoneOutlined /> Phone: <Link href="tel:+1234567890">+123 456 7890</Link></Text>
                    </Space>
                </Col>
                <Col xs={24} sm={12} md={8} lg={8}>
                    <Space direction="vertical">
                        <Text strong>Address</Text>
                        <Text><EnvironmentOutlined /> Central Environmental Authority</Text>
                        <Text>මධ්‍යම පරිසර අධිකාරිය</Text>
                        <Text>மத்திய சுற்றாடல் அதிகாரசபை</Text>
                    </Space>
                </Col>
                <Col xs={24} sm={12} md={8} lg={8}>
                    <Space direction="vertical">
                        <Text strong>Follow Us</Text>
                        <Link href="https://www.facebook.com/cea.srilanka" target="_blank"><FacebookOutlined /> Facebook</Link>
                        <Link href="https://twitter.com/cea_srilanka" target="_blank"><TwitterOutlined /> Twitter</Link>
                        <Link href="https://www.linkedin.com/company/central-environmental-authority-sri-lanka" target="_blank"><LinkedinOutlined /> LinkedIn</Link>
                    </Space>
                </Col>
            </Row> */}
            <div style={{ marginTop: '20px' }}>
                <Row justify="center">
                    <Text><PhoneOutlined /> Phone: {companyDetails.PHONE_NUMBER}</Text>
                </Row>
                <Row justify="center">
                    <Text>sukithadhamsara ©2023 All Rights Reserved</Text>
                </Row>


            </div>
        </Footer>
    );
}

export default AppFooter;
