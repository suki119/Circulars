import React, { useRef, useState } from 'react';
import { BrowserRouter as Router, Route, Link, useHistory } from 'react-router-dom';
import { SearchOutlined, PlusOutlined } from '@ant-design/icons';
import AccountCSS from './account.module.css';
import { DownOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Divider, Row, Col, message, Space, Table, Badge, Dropdown , Tag  } from 'antd';
import { Form, Input, Select, Button } from 'antd';
import '../../styles/common.css';
import { EyeFilled, EditFilled } from '@ant-design/icons';
import { themeColors } from '../../theme/variables';
import Loader from '../commonComponent/Loader';

const { Option } = Select;
const { Item } = Form;
const { Header, Content } = Layout;
const style = { background: '#0092ff', padding: '8px 0' };

function ProductListMainUIComponent(props) {
    const screenWidth = window.innerWidth;

    const history = useHistory();
    console.log("products", props.allProducts)

    const items = [
        {
            key: '1',
            label: 'Action 1',
        },
        {
            key: '2',
            label: 'Action 2',
        },
    ];

    const [checkStrictly, setCheckStrictly] = useState(false);

    const buttonStyle = {
        textAlign: screenWidth >= 768 ? 'right' : 'left',
    };

    const handleButtonClick = () => {
        history.push('/add-product'); // Navigate to the "AddProductMain" page
    };

    const expandedRowRender = (record) => {
        const columns = [
            {
                title: 'Bagage ID',
                dataIndex: 'bagageID',
                key: 'bagageID',
            },
            {
                title: 'Serial Number',
                dataIndex: 'serialNumber',
                key: 'serialNumber',
            },
            {
                title: 'Type',
                dataIndex: 'type',
                key: 'type',
            },
            {
                title: 'Status',
                dataIndex: 'status',
                key: 'status',
                render: (status) => (
                    <span>
                        <Tag color={status === 'Y' ? 'green' : 'red'}>
                            {status === 'Y' ? 'Delivered' : 'Pending'}
                        </Tag>
                    </span>
                ),
            },
        ];

        return (
            <Table columns={columns} dataSource={record.bagageData} pagination={false} />
        );
    };

    const columns = [
        {
            title: 'Company Name',
            dataIndex: 'accountName',
            key: 'accountName',

        },
        {
            title: 'Product Name',
            dataIndex: 'productName',
            key: 'productName',

        },
        {
            title: 'Product Category',
            dataIndex: 'productCategory',
            key: 'productCategory',

        },
        {
            title: 'Length',
            dataIndex: 'productDetails',
            key: 'productDetails',
            width: '10%',

        },

        {
            title: 'Status',
            dataIndex: 'productStatus',
            key: 'productStatus',
            width: '10%',
            render: (productStatus) => (
                <span>
                    <Tag color={productStatus === 'Y' ? 'green' : 'red'}>
                        {productStatus === 'Y' ? 'Delivered' : 'Pending'}
                    </Tag>
                </span>
            ),
        }, {
            title: 'Action',
            dataIndex: '',
            key: 'x',

            render: () => <div style={{ textAlign: 'center' }}>
                <Button
                    type="primary"
                    icon={<EditFilled />}
                    size="default"
                    style={{
                        backgroundColor: themeColors.themeColor,
                        color: '#005eb8',
                        border: '1px solid rgba(0, 0, 0, 0.23)',
                    }}
                />

            </div>,
        }
    ];

    // Sample data
    const data = [
        {
            key: '1',
            accountName: 'Nisala',
            productName: 'Oba Thama MV',
            productCategory: 'musicvideo',
            productDetails: '3.5',
            productDescription: '',
            productStatus: 'Y',
            bagageData: [
                {
                    bagageID: 'WD My Passport',
                    serialNumber: 'NA',
                    type: 'Harddrive',
                    status: 'Y',
                },
            ],
        },
        // Add more data as needed
    ];

    return (
        <div>
            <Row justify="space-between" align="middle">
                <Col xs={24} sm={12} lg={16}>
                    <Breadcrumb style={{ margin: '10px 0' }}>
                        <Breadcrumb.Item>Product</Breadcrumb.Item>
                        <Breadcrumb.Item>List</Breadcrumb.Item>
                    </Breadcrumb>
                </Col>
                <Col xs={24} sm={12} lg={8} style={buttonStyle}>
                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        className="common-save-btn common-btn-color"
                        onClick={handleButtonClick}
                        style={{
                            textAlign: 'left', // Add this style for small screens
                        }}
                    >
                          <span style={{fontWeight:'600'}}> Add New Product</span> 
                    </Button>
                </Col>
            </Row>
            <Content
                className="common-cotent-container"
                style={{
                    background: props.isDarkMode ? 'var(--content-container-bg-dark)' : 'var(--content-container-bg-light)',
                    marginTop: '5px'
                }}
            >
                <Divider orientation="left" orientationMargin="0">All Products</Divider>

                <Table
                    columns={columns}
                    expandable={{
                        expandedRowRender,

                    }}
                    dataSource={props.allProducts}
                    size="small"
                    scroll={{
                        y: screenWidth > 960 ? 600 : 300,
                        x: true
                    }} // Enable horizontal scrolling
                />
            </Content>
            {props.loader && <Loader />}
        </div>
    );
}

export default ProductListMainUIComponent;
