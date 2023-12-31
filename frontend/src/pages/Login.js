import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Card, Row, Col, Typography } from 'antd';
import logoimg from '../images/logo.png'
import logoimgwording from '../images/logo2.png'
import childrensImg from '../images/IMG_3428.jpg'
import { BrowserRouter as Router, Route, Link, useHistory } from 'react-router-dom';
import { authService } from '../services/AuthService'


// Import your vector image or use a placeholder image
// import VectorImage from './path/to/vector_image.svg'; // Update with the correct path
const { Title, Paragraph } = Typography;
const { Item } = Form;
function Login() {

  const history = useHistory();

  const onFinish = async (values) => {

    try {
      await authService.login(values.username, values.password).then(
        () => {
         
            history.push('/landing');
           
            // localStorage.setItem("userName", email);
       


        },
        (error) => {
          console.log(error);
        }
      );
    } catch (err) {
      console.log(err);
    }


  };




  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#157a3dc9' }}>
      <Card style={{ width: '100%', padding: '10px', margin: '250px' }}>

        <Row gutter={[16, 16]}>
          <Col xs={24} lg={10}>
            <Row>
              <img src={logoimgwording} alt="Vector" style={{ width: '100%', height: '100%' }} />
            </Row>
            <div style={{ justifyContent: 'center', display: 'grid' }}>
              <Row>
                <Typography style={{ marginBottom: '20px' }}>
                  <Title level={2} style={{ marginBottom: '8px', fontWeight: '500', color: 'green' }}>Login</Title>
                  <Paragraph style={{ fontWeight: '500', color: 'darkgray' }}>Sign in to your Account</Paragraph>
                </Typography>
              </Row>
              <Row>
                <Form
                  name="login-form"
                  initialValues={{ remember: true }}
                  onFinish={onFinish}

                  layout='vertical'
                >
                  <Item
                    name="username"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                  >
                    <Input placeholder="Username" />
                  </Item>
                  <Item
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                  >
                    <Input.Password placeholder="Password" />
                  </Item>
                  <Item>
                    <Button type="primary" htmlType="submit" style={{ width: '100%' }} className="common-save-btn common-btn-color">
                      <span style={{ fontWeight: '500' }}>LOGIN</span>
                    </Button>
                  </Item>
                </Form>
              </Row>
            </div>
          </Col>
          <Col xs={24} lg={14}>
            <img src={childrensImg} alt="Vector" style={{ width: '100%', height: '100%', padding: 'inherit', borderRadius: "20px" }} />
          </Col>
        </Row>
      </Card>
    </div>
  );
}

export default Login;
