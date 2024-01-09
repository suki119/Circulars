import React, { useEffect, useState, useRef } from "react";
import { Breadcrumb, Layout, Divider, Row, Col, message, Empty, Space, Table, Checkbox, Switch } from 'antd';
import { Form, Input, Select, Button, DatePicker, Upload, message as AntMessage } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import moment from 'moment';

import {
    unites,
    UserRoles,
    DocumentLevels,
    DL1_SubLevels,
    DL2_SubLevels,
    DL3_SubLevels,
    DL4_SubLevels
} from '../enums/constants'

import axios from "axios";
import Swal from 'sweetalert2'
import { appURLs, webAPI } from '../enums/urls';
import Loader from '../component/commonComponent/Loader';
import { BrowserRouter as Router, Route, Link, useHistory } from 'react-router-dom';
import { authService } from '../services/AuthService'


const { Item } = Form;
const { Option } = Select;
const { TextArea } = Input;
const { Header, Content } = Layout;
const { Dragger } = Upload;

function UserProfile({ isDarkMode }) {

    const [form] = Form.useForm();
    const [loaderStatus, setLoaderStatus] = useState(false);
    const history = useHistory();
    const [user, setUser] = useState('');
    const [currentUser, setCurrentUser] = useState('');
    const [documentSubLevel, setDocumentSubLevel] = useState([]);
    const [qmsAccess, setQmsAccess] = useState(false);
   
   

    const onFinish = (values) => {

        if(values.newPassword){
            values.password = values.newPassword;
            delete values.newPassword;     
            values.passwordstatus = "true";
        }else{

            values.password = user.password;
            delete values.newPassword;     
            values.passwordstatus = "false";

        }

       
        setLoaderStatus(true)
        axios.put(appURLs.web + webAPI.updateUser + currentUser.id, values)
            .then((res) => {
                setLoaderStatus(false)
                if (res.status == 200) {

                    Swal.fire(
                        values.empName + ' Updated!',
                        'Employee has been Updated.',
                        'success'
                    );

                    handleClear()
                }

            })
            .catch((error) => {

                setLoaderStatus(false)
                Swal.fire({
                    position: 'top-end',
                    icon: 'error',
                    title: 'Network Error',
                    showConfirmButton: false,
                    timer: 1500,
                });
                console.error("Error", error);

            });
    }

    const handleClear = () => {
        setDocumentSubLevel([])
        form.resetFields(); // Reset form fields
    };

    const getUserDetailsById = () => {
        const currentUser = authService.getCurrentUser();
        setCurrentUser(currentUser)
        setLoaderStatus(true)
        axios.get(appURLs.web + webAPI.getUserById + currentUser.id)
            .then((res) => {
             
                if (res.status === 200) {

                    form.setFieldsValue({
                        ...res.data,

                    });

                    setUser(res.data);

                    setLoaderStatus(false)

                }
                // setLoader(false);
            })
            .catch((error) => {
                setLoaderStatus(false)
                Swal.fire({
                    position: 'top-end',
                    icon: 'error',
                    title: 'Network Error',
                    showConfirmButton: false,
                    timer: 1500,
                });
                console.error("Error", error);
            });

    }

    useEffect(() => {

        getUserDetailsById();

    }, []);




    return (
        <div>
            <Breadcrumb style={{ margin: '10px 0' }}>
                <Breadcrumb.Item>User Management</Breadcrumb.Item>
                <Breadcrumb.Item>User Profile</Breadcrumb.Item>
            </Breadcrumb>

            <Row gutter={[16, 16]}>
                <Col xs={24} lg={24}>
                    <Content
                        className="common-cotent-container"
                        style={{
                            background: isDarkMode ? 'var(--content-container-bg-dark)' : 'var(--content-container-bg-light)',
                            paddingLeft: '30px', paddingRight: '30px'
                        }}
                    >
                        <Divider orientation="left" orientationMargin="0">Basic Details</Divider>

                        <Form

                            form={form}
                            name="pdfUploadForm"
                            onFinish={(values) => onFinish(values)}
                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 24 }}

                            layout='vertical'
                        >
                            <Row gutter={16}>
                                <Col lg={12} xs={24}>
                                    <Item
                                        label="Employee Name"
                                        name="empName"
                                        rules={[{ required: true, message: 'Please input the Emplyee Name!' }]}
                                    >
                                        <Input />
                                    </Item>
                                </Col>
                                <Col lg={12} xs={24}>
                                    <Item
                                        label="Employee Number"
                                        name="empNumber"

                                    >
                                        <Input />
                                    </Item>
                                </Col>
                            </Row>
                            <Row gutter={16}>
                                <Col lg={12} xs={24}>
                                    <Item
                                        label="User Name"
                                        name="email"
                                        rules={[{ required: true, message: 'Please input the User Name!' }]}
                                    >
                                        <Input />
                                    </Item>
                                </Col>
                                <Col lg={12} xs={24}>
                                    <Item
                                        label="New Password"
                                        name="newPassword"
                                        rules={[
                                            
                                            ({ getFieldValue }) => ({
                                                validator(_, value) {
                                                    if (!value || value.length >= 6) {
                                                        return Promise.resolve();
                                                    }
                                                    return Promise.reject('Password must be at least 6 characters!');
                                                },
                                            }),
                                        ]}

                                    >
                                        <Input.Password />
                                    </Item>
                                </Col>
                            </Row>





                            <Row style={{ marginBottom: "10px" }}>
                                <Col span={24} style={{ textAlign: 'right' }}>
                                    <Button type="default" onClick={handleClear} style={{
                                        marginRight: '8px',
                                        backgroundcolor: isDarkMode ? 'var(--cancel-btn-bg-dark)' : 'var(--cancel-btn-bg-light)',
                                        color: isDarkMode ? 'var( --cancel-btn-color-dark)' : 'var(--cancel-btn-color-light)'

                                    }}>
                                        <span style={{ fontWeight: '700' }}>RESET</span>
                                    </Button>
                                    <Button type="primary" htmlType="submit" className="common-save-btn common-btn-color">
                                        <span style={{ fontWeight: '600' }}>SAVE</span>
                                    </Button>
                                </Col>
                            </Row>
                        </Form>
                    </Content>
                </Col>
            </Row>
            {loaderStatus && <Loader />}
        </div >
    );
}

export default UserProfile;