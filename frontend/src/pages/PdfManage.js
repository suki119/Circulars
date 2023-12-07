import React, { useEffect, useState, useRef } from "react";
import { Breadcrumb, Layout, Divider, Row, Col, message, Empty, Space, Table, Checkbox, Modal } from 'antd';
import { Form, Input, Select, Button, DatePicker, Upload, message as AntMessage } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import moment from 'moment';
import { divisions } from '../enums/constants'
import axios from "axios";
import Swal from 'sweetalert2'
import { appURLs, webAPI } from '../enums/urls';
import Loader from '../component/commonComponent/Loader';
import { BrowserRouter as Router, Route, Link, useHistory } from 'react-router-dom';
import AccountCSS from '../component/pagesComponent/account.module.css';
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import EditButton from '../component/commonComponent/Buttons/IconButtons/EditButton';
import deleteButton from '../component/commonComponent/Buttons/IconButtons/DeleteButton ';
import DeleteButton from "../component/commonComponent/Buttons/IconButtons/DeleteButton ";


const { Item } = Form;
const { Option } = Select;
const { TextArea } = Input;
const { Header, Content } = Layout;
const { Dragger } = Upload;

function PdfManage({ isDarkMode }) {

    const screenWidth = window.innerHeight;


    const [Pdfform] = Form.useForm();
    const [form] = Form.useForm();
    const [loaderStatus, setLoaderStatus] = useState(false);
    const history = useHistory();
    const [allCirculars, setAllCirculars] = useState([]);
    const [allPrevCirculars, setAllPrvCirculars] = useState([]);

    const [selectedDivision, setSelectedDivision] = useState('');
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
    const [isEditDialogVisible, setEditDialogVisible] = useState(false);
    const [editRecord, setEditRecord] = useState(null);




    const onFinish = (values, event) => {

        //  event.preventDefault();
        // Handle form submission here
        console.log('Received values:', values);

        const pdfFileData = values.pdfUpload[0].originFileObj;

        const formData = new FormData();

        formData.append("eng_title", values.pdfTitle);
        formData.append("sin_title", values.pdfTitle);
        formData.append("division", values.division);
        formData.append("keywords", 'tags');
        formData.append("date", values.date);
        formData.append("document", pdfFileData);

        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };


        setLoaderStatus(true)
        axios.post(appURLs.web + webAPI.pdfFileInsert, formData, config)
            .then((res) => {
                setLoaderStatus(false)
                history.push('/allCirculars');
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
    };

    const handleClear = () => {
        form.resetFields(); // Reset form fields
        getAllCirculars();
    };

    useEffect(() => {

        // Filter allCirculars based on selectedDivision
        const filteredList = allPrevCirculars.filter(circular => circular.division === selectedDivision);
        // Update the state with the filtered list
        setAllCirculars(filteredList);

    }, [selectedDivision]);


    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        console.log("selectedKeys,confirm1,",selectedKeys)
        console.log("selectedKeys,confirm2,",confirm)
        console.log("selectedKeys,confirm3,",dataIndex)
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


    const getAllCirculars = () => {
        setLoaderStatus(true)
        axios.get(appURLs.web + webAPI.getAllCirculars)
            .then((res) => {
                console.log(res)
                if (res.status === 200) {

                    setAllCirculars(res.data);
                    setAllPrvCirculars(res.data)
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
    };

    const onEditBtn = record => {

        const momentDate = moment(record.date);
        Pdfform.setFieldsValue({...record,date: momentDate,});
        console.log("edit", record)
        setEditRecord(record);
        setEditDialogVisible(true);
    }

    const onDeleteBtn = record => {


        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',

        }).then((result) => {
            if (result.isConfirmed) {
                setLoaderStatus(true)
                axios.delete(appURLs.web + webAPI.pdfFileDelete + record._id).then((res) => {

                    if (res.status == '200') {
                        getAllCirculars();
                        Swal.fire(
                            'Deleted!',
                            'Your file has been deleted.',
                            'success'
                        )


                        setLoaderStatus(false)
                    }

                })


            } else {
                setLoaderStatus(false)
            }
        }).catch((error) => {
            console.error('Error', error);
            setLoaderStatus(false)
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'Network Error',
                showConfirmButton: false,
                timer: 1500
            })


        })

    }



    const columns = [
        {
            title: '',
            dataIndex: 'number',
            key: 'number',
            width: '8%',
            render: (text, record, index) => index + 1 + '.',

        },
        {
            title: 'Division',
            dataIndex: 'division',
            key: 'division',
            width: '15%',
            ...getColumnSearchProps('division'),
            ellipsis: true
        },
        {
            title: 'Circular Date',
            dataIndex: 'date',
            key: 'date',
            width: '15%',
            ...getColumnSearchProps('date'),
            ellipsis: true,
            render: text => {
                const formattedDate = new Date(text).toLocaleDateString('en-GB'); // Adjust the locale as needed
                return <span style={{ whiteSpace: 'pre-line' }}>{formattedDate}</span>;
              },
        },
      

        {
            title: 'Circular Name',
            dataIndex: 'sin_title',
            key: 'sin_title',
            width: '75%',
            ...getColumnSearchProps('sin_title'),
            ellipsis: true,
            render: text => <span style={{ whiteSpace: 'pre-line' }}>{text}</span>,
        },
        {
            title: 'KeyWords',
            dataIndex: 'keywords',
            key: 'keywords',
            width: '15%',
            ...getColumnSearchProps('keywords'),
            ellipsis: true
            
        },
        {
            title: 'Action',
            dataIndex: '',
            key: 'x',
            width: '15%',
            render: record => <div style={{ textAlign: 'center', display: 'flex', "placeContent": 'space-evenly' }}>
                <EditButton onClick={() => onEditBtn(record)} />
                <DeleteButton onClick={() => onDeleteBtn(record)} />

            </div>,
        },

    ];



    useEffect(() => {
    }, [selectedDivision]);

    useEffect(() => {

        getAllCirculars();

    }, []);

    const onCancel = () => {
       
        setEditDialogVisible(false);
      
    };

    return (
        <div>
            <Breadcrumb style={{ margin: '10px 0' }}>
                <Breadcrumb.Item>PDF Management</Breadcrumb.Item>
                <Breadcrumb.Item>PDF Manage</Breadcrumb.Item>
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
                        <Divider orientation="left" orientationMargin="0">PDF File Manager</Divider>

                        <Form

                            form={form}
                            name="pdfUploadForm"

                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 24 }}

                            layout='vertical'
                        >

                            <Row gutter={16}>
                                <Col lg={12} xs={24}>
                                    <Item
                                        label=""
                                        name=""
                                    >

                                        <Select
                                            showSearch
                                            placeholder="Select the Division"
                                            optionFilterProp="children"
                                            filterOption={(input, option) => (option?.label ?? '').includes(input)}
                                            filterSort={(optionA, optionB) =>
                                                (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                            }
                                            options={divisions}
                                            onChange={value => setSelectedDivision(value)}
                                        />
                                    </Item>
                                </Col>

                                <Col lg={12} xs={24}>
                                    <Item
                                        label=""
                                        name="."
                                    >
                                        <Button type="default" onClick={handleClear} style={{
                                            marginRight: '8px',

                                            backgroundcolor: isDarkMode ? 'var(--cancel-btn-bg-dark)' : 'var(--cancel-btn-bg-light)',
                                            color: isDarkMode ? 'var( --cancel-btn-color-dark)' : 'var(--cancel-btn-color-light)'

                                        }}>
                                            <span style={{ fontWeight: '700' }}>RESET</span>
                                        </Button>
                                    </Item>
                                </Col>

                            </Row>
                        </Form>

                        <Table columns={columns} dataSource={allCirculars}

                            pagination={{
                                pageSize: 10,
                            }}
                            scroll={{
                                y: screenWidth > 960 ? 560 : 270,

                            }}

                            className={`${AccountCSS.customtable}`} />



                    </Content>
                </Col>
            </Row>
            <Modal
                title="Edit PDF"
                visible={isEditDialogVisible}
                onCancel={onCancel}
                onOk={() => Pdfform.submit()}
                width={'75%'}
            >
                <Form
                    form={Pdfform}
                    name="pdfUploadForm"
                    onFinish={onFinish}
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    initialValues={{
                        ...editRecord, // Set initial values from the editRecord
                    }}
                    layout="vertical"
                >
                    <Item label="PDF Title" name="sin_title" rules={[{ required: true, message: 'Please input the PDF title!' }]}>
                        <Input />
                    </Item>

                    <Row gutter={16}>
                        <Col lg={12} xs={24}>
                            <Item label="Division" name="division" rules={[{ required: true, message: 'Please select the division!' }]}>
                                <Select
                                    showSearch
                                    placeholder="Search to Select"
                                    optionFilterProp="children"
                                    filterOption={(input, option) => (option?.label ?? '').includes(input)}
                                    filterSort={(optionA, optionB) =>
                                        (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                    }
                                    options={divisions}
                                />
                            </Item>
                        </Col>
                        <Col lg={12} xs={24}>
                            <Item label="Date" name="date" rules={[{ required: true, message: 'Please select the date!' }]}>
                                <DatePicker style={{ width: '100%' }} disabled />
                            </Item>
                        </Col>
                    </Row>

                    <Item label="Remark" name="remark">
                        <TextArea />
                    </Item>
                </Form>
            </Modal>
            {loaderStatus && <Loader />}
        </div>
    );
}

export default PdfManage;