import React, { useState } from 'react';
import { Form, Input, Button, Card, Row, Col, Typography, message , Modal  } from 'antd';
import logoimgwording from '../images/logo2.png'
import childrensImg from '../images/IMG_3428.jpg'
import { useHistory } from 'react-router-dom';
import { authService } from '../services/AuthService';
import {  PhoneOutlined } from '@ant-design/icons';
import {companyDetails} from '../enums/constants';
const { Text  } = Typography;


// Import your vector image or use a placeholder image
// import VectorImage from './path/to/vector_image.svg'; // Update with the correct path
const { Title, Paragraph } = Typography;
const { Item } = Form;
function Login() {

  const [errorMsg, seterrormsg] = useState('');
  const screenWidth = window.innerWidth;
  const history = useHistory();

  const onFinish = async (values) => {

    try {
      await authService.login(values.username, values.password).then(
        (res) => {

          if (res.data.status) {

            history.push('/landing');

          } else {
            message.error(res.data.message);
            seterrormsg(res.data.message)
          }



        },
        (error) => {
          console.log(error);
        }
      );
    } catch (err) {
      console.log(err);
    }


  };

  const handleForgetPasswordClick = () => {
    Modal.info({
      title: 'Forget Password',
      content: (
        <div>
          <p>Contact admin for password recovery assistance.</p>
          <Text><PhoneOutlined /> Phone: {companyDetails.PHONE_NUMBER}</Text>
        </div>
      ),
      onOk() {},
    });
  };


  return (

    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#075e54' }}>
      <Card style={{ width: '100%', padding: '10px', margin: screenWidth > 850 ? '250px' : '50px' }}>

        <Row gutter={[16, 16]}>

          <Col xs={24} lg={10}>
            <Row>
              <img src={logoimgwording} alt="Vector" style={{ width: '100%', height: '100%' }} />
            </Row>
            <Row style={{ justifyContent: 'center' }}>
              <span style={{ fontWeight: '700', fontSize: '1.1vw', color: 'var(--theam-color)', marginTop: '15px' }}>National Environmental Information Center</span>
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
                  <Item style={{marginTop:'-25px'}}>
                    <a onClick={handleForgetPasswordClick} style={{ float: 'right' }}>
                      Forget Password?
                    </a>
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
