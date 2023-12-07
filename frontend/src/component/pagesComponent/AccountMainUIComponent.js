import React, { useRef, useState } from 'react';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import AccountCSS from './account.module.css';
import { Breadcrumb, Layout, Divider, Row, Col, message, Space, Table } from 'antd';
import { Form, Input, Select, Button } from 'antd';
import '../../styles/common.css';
import { EyeFilled, EditFilled } from '@ant-design/icons';
import { themeColors } from '../../theme/variables';
import Loader from '../commonComponent/Loader';
import EditButton from '../commonComponent/Buttons/IconButtons/EditButton';

const { Option } = Select;
const { Item } = Form;
const { Header, Content } = Layout;
const style = { background: '#0092ff', padding: '8px 0' };

function AccountMainUIComponent(props) {

    const { allAcounts } = props;

    const screenWidth = window.innerHeight;

    const [form] = Form.useForm();
    const [addressDisabled, setAddressDisabled] = useState(true);

    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);




    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
    };
    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div
                style={{
                    padding: 8,
                }}
                onKeyDown={(e) => e.stopPropagation()}
            >
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{
                        marginBottom: 8,
                        display: 'block',
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({
                                closeDropdown: false,
                            });
                            setSearchText(selectedKeys[0]);
                            setSearchedColumn(dataIndex);
                        }}
                    >
                        Filter
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            close();
                        }}
                    >
                        close
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{
                    color: filtered ? '#1677ff' : undefined,
                }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{
                        backgroundColor: '#ffc069',
                        padding: 0,
                    }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });


    const columns = [
        {
            title: 'Company Name',
            dataIndex: 'companyName',
            key: 'companyName',
            width: '35%',
            ...getColumnSearchProps('companyName'),
            ellipsis: true
        },
        {
            title: 'Phone No',
            dataIndex: 'phoneNo',
            key: 'phoneNo',
            width: '20%',
            ...getColumnSearchProps('phoneNo'),
            ellipsis: true
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            width: '25%',
            ...getColumnSearchProps('email'),
            sorter: (a, b) => a.email.length - b.email.length,
            sortDirections: ['descend', 'ascend'],
            ellipsis: true
        },
        {
            title: 'Action',
            dataIndex: '',
            key: 'x',
            width: '20%',
            render: () => <div style={{ textAlign: 'center' }}>
                <EditButton />

            </div>,
        },

    ];

    const onFinish = (values) => {
        // Handle form submission here

        props.onFormSubmit(values); // Pass the form values to the parent component

    };

    const onAddressBtnClick = () => {
        form.setFieldsValue({
            address1: 'N/A',
            address2: 'N/A',
            address3: 'N/A',
        });
        setAddressDisabled(false);
    };

    const onResetBtnClick = () => {
        form.resetFields();
        setAddressDisabled(true);
    };


    return (
        <>
            <Breadcrumb style={{ margin: '10px 0' }}>
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item>List</Breadcrumb.Item>
                <Breadcrumb.Item>App</Breadcrumb.Item>
            </Breadcrumb>

            <Row gutter={[16, 16]}>
                <Col xs={24} lg={10}>
                    <Content
                        className="common-cotent-container"
                        style={{
                            background: props.isDarkMode ? 'var(--content-container-bg-dark)' : 'var(--content-container-bg-light)',
                        }}
                    >
                        <Divider orientation="left" orientationMargin="0">Add Company Details</Divider>
                        <Form
                            form={form}
                            onFinish={onFinish}
                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 24 }}
                            layout="vertical"
                        >
                            <Item
                                label="Company Name"
                                name="CompanyName"
                                rules={[{ required: true, message: 'Please enter the company name' }]}
                            >
                                <Input />
                            </Item>
                            <Row gutter={16}>
                                <Col lg={12} xs={24}>
                                    <Item
                                        label="Company Email"
                                        name="CompanyEmailAddress"
                                        rules={[
                                            { required: true, message: 'Please enter the company email' },
                                            { type: 'email', message: 'Invalid email format' },
                                        ]}
                                    >
                                        <Input />
                                    </Item>
                                </Col>
                                <Col lg={12} xs={24}>
                                    <Item
                                        label="Company Phone Number"
                                        name="CompanyPhonenumber"
                                        rules={[{ required: true, message: 'Please enter the phone number' }]}
                                    >
                                        <Input />
                                    </Item>
                                </Col>
                            </Row>
                            <Row gutter={16}>
                                <Col lg={8} xs={24}>
                                    <Item
                                        label="No"
                                        name="address1"
                                        initialValue="N/A"
                                        rules={[{ required: !addressDisabled, message: 'Please enter the address' }]}
                                    >
                                        <Input disabled={addressDisabled} />
                                    </Item>
                                </Col>
                                <Col lg={8} xs={24}>
                                    <Item
                                        label="Street"
                                        name="address2"
                                        initialValue="N/A"
                                        rules={[{ required: !addressDisabled, message: 'Please enter the address' }]}
                                    >
                                        <Input disabled={addressDisabled} />
                                    </Item>
                                </Col>
                                <Col lg={8} xs={24}>
                                    <Item
                                        label="City"
                                        name="address3"
                                        initialValue="N/A"
                                        rules={[{ required: !addressDisabled, message: 'Please enter the address' }]}
                                    >
                                        <Input disabled={addressDisabled} />
                                    </Item>
                                </Col>
                            </Row>
                            <Row gutter={16}>
                                <Col lg={16} xs={24}>
                                    <Item
                                        label="Country"
                                        name="country"
                                        initialValue="Sri Lanka"
                                        rules={[{ required: !addressDisabled, message: 'Please select the country' }]}
                                    >
                                        <Select disabled={addressDisabled}>
                                            <Option value="Sri Lanka">Sri Lanka</Option>
                                            {/* Add other country options here */}
                                        </Select>
                                    </Item>
                                </Col>
                                <Col span={8}>
                                    <Item>
                                        <Button type="primary" onClick={onAddressBtnClick} className={`${AccountCSS.fillbtnsmallscreen} common-save-btn common-btn-color`} >
                                             <span style={{fontWeight:'600'}}>FILL ADRESS</span> 
                                        </Button>
                                    </Item>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={24}>
                                    <Button type="primary" htmlType="submit" className="common-save-btn common-btn-color" style={{ marginTop: '16px' }}>
                                        <span style={{ fontWeight: '600' }}>SAVE</span>
                                    </Button>

                                    <Button type="default" onClick={onResetBtnClick} style={{
                                        marginLeft: '8px',
                                        backgroundcolor: props.isDarkMode ? 'var(--cancel-btn-bg-dark)' : 'var(--cancel-btn-bg-light)',
                                        color: props.isDarkMode ? 'var( --cancel-btn-color-dark)' : 'var(--cancel-btn-color-light)'

                                    }}>
                                        <span style={{ fontWeight: '700' }}>RESET</span>
                                    </Button>
                                </Col>
                            </Row>

                        </Form>
                    </Content>
                </Col>

                <Col xs={24} lg={14}>
                    <Content
                        className="common-cotent-container"
                        style={{
                            background: props.isDarkMode ? 'var(--content-container-bg-dark)' : 'var(--content-container-bg-light)',
                        }}
                    >
                        <Divider orientation="left" orientationMargin="0">All Companies</Divider>


                        <Table columns={columns} dataSource={allAcounts}

                            pagination={{
                                pageSize: 10,
                            }}
                            scroll={{
                                y: screenWidth > 960 ? 600 : 300,
                                x: screenWidth > 960 ? false : true
                            }}

                            className={`${AccountCSS.customtable}`} />


                    </Content>
                </Col>
            </Row>

            {props.loader && <Loader />}
        </>
    );
}

export default AccountMainUIComponent;
