import React, { useEffect, useState, useRef } from "react";
import { Breadcrumb, Layout, Divider, Row, Col, message, Empty, Space, Table, Checkbox, Modal, theme, Tag, Switch } from 'antd';
import { Form, Input, Select, Button, DatePicker, Upload, message as AntMessage } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { PlusOutlined } from '@ant-design/icons';
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
import {
    unites,
    UserRoles,
    DocumentLevels,
    DL1_SubLevels,
    DL2_SubLevels,
    DL3_SubLevels,
    DL4_SubLevels
} from '../enums/constants'


const { Item } = Form;
const { Option } = Select;
const { TextArea } = Input;
const { Header, Content } = Layout;
const { Dragger } = Upload;

function PdfManage({ isDarkMode }) {

    const screenWidth = window.innerHeight;
    const screenHeight = window.innerHeight;
    const { token } = theme.useToken();
    const [form] = Form.useForm();
    const [formSearch] = Form.useForm();

    const [loaderStatus, setLoaderStatus] = useState(false);
    const history = useHistory();
    const [allCirculars, setAllCirculars] = useState([]);
    const [allPrevCirculars, setAllPrvCirculars] = useState([]);
    const [tags, setTags] = useState(['']);
    const [selectedDivision, setSelectedDivision] = useState('');
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
    const [isEditDialogVisible, setEditDialogVisible] = useState(false);
    const [editRecord, setEditRecord] = useState(null);
    const [inputVisible, setInputVisible] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const inputRef = useRef(null);
    const [qmsAccess, setQmsAccess] = useState(false);
    const [documentSubLevel, setDocumentSubLevel] = useState([]);
    const [qmsAccessCirculars, setQmsAccessCirculars] = useState(false);
    const [initialDateValue, setInitialDateValue] = useState(null);
    const [refrenceOptions, setRefrenceOptions] = useState([]);
    const [refPdfList, setRefPdfList] = useState([]);





    const onFinish = (values, event) => {


        // Handle form submission here
        const ref = values.refrences1;
        const newRefString = ref.map(refobject => refobject.value || refobject).join(',');


        let endPath = webAPI.pdfFileUpdate;
        const formData = new FormData();
        let pdfData = {}

        if (qmsAccessCirculars) {
            pdfData.qmsAccess = values.qmsAccess;
            pdfData.subLevel = values.subLevel;
            pdfData.documentLevel = values.documentLevel;
            pdfData.refrences = [newRefString === "" ? undefined : newRefString];

            endPath = webAPI.qmsPdfFileUpdate;
        }

        pdfData.eng_title = values.sin_title;
        pdfData.sin_title = values.sin_title;
        pdfData.division = values.division;
        pdfData.date = values.date;

        pdfData.keywords = tags.join(',');
        pdfData.date = values.date;



        setLoaderStatus(true)
        axios.put(appURLs.web + endPath + editRecord._id, pdfData)
            .then((res) => {
                setLoaderStatus(false)
                getAllCirculars();
                onCancel();
                // history.push('/allCirculars');
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
        formSearch.resetFields(); // Reset form fields
        getAllCirculars();
    };

    useEffect(() => {

        // Filter allCirculars based on selectedDivision
        const filteredList = allPrevCirculars.filter(circular => circular.division === selectedDivision);
        // Update the state with the filtered list
        setAllCirculars(filteredList);

    }, [selectedDivision]);


    const handleSearch = (selectedKeys, confirm, dataIndex) => {

        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters,confirm) => {

        clearFilters();
        setSearchText('');
        confirm();


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
                        onClick={() => clearFilters && handleReset(clearFilters,confirm)}
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
        let endPoint = webAPI.getAllCirculars;
        if (qmsAccessCirculars) {
            endPoint = webAPI.qmsGetAllCirculars;
        }
        setLoaderStatus(true)
        axios.get(appURLs.web + endPoint)
            .then((res) => {

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

    useEffect(() => {
        if (inputVisible) {
            inputRef.current?.focus();
        }
    }, [inputVisible]);

    const handleClose = (removedTag) => {
        const newTags = tags.filter((tag) => tag !== removedTag);

        setTags(newTags);
    };


    const forMap = (tag) => {
        const tagElem = (
            <Tag
                closable
                onClose={(e) => {
                    e.preventDefault();
                    handleClose(tag);
                }}
            >
                {tag}
            </Tag>
        );
        return (
            <span
                key={tag}
                style={{
                    display: 'inline-block',
                }}
            >
                {tagElem}
            </span>
        );
    };

    const tagChild = tags.map(forMap);

    const tagPlusStyle = {
        background: token.colorBgContainer,
        borderStyle: 'dashed',
    };


    const showInput = () => {
        setInputVisible(true);
    };

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };
    const handleInputConfirm = () => {
        if (inputValue && tags.indexOf(inputValue) === -1) {
            setTags([...tags, inputValue]);
        }

        setInputVisible(false);
        setInputValue('');
    };

    const getReffrencedList = async (record) => {


        const refList = record?.refrences[0]?.split(",");
        const refrencePdfList = [];
        const promises = [];

        refList?.forEach(data => {
            setLoaderStatus(true);
            if(data !== "undefined"){
                const promise = axios.get(appURLs.web + webAPI.getFileUploadById + data)
                    .then((res) => {
                        if (res.status === 200) {
                            let refOptionData = {
                                value: res.data._id,
                                label: res.data.sin_title
                            }
                            refrencePdfList.push(refOptionData);
                            setLoaderStatus(false);
                        }
                    })
                    .catch((error) => {
                        setLoaderStatus(false);
                        Swal.fire({
                            position: 'top-end',
                            icon: 'error',
                            title: 'Network Error',
                            showConfirmButton: false,
                            timer: 1500,
                        });
                        console.error("Error", error);
                    });

                promises.push(promise);
            }
        });

        // Wait for all promises to resolve
        try {
            await Promise.all(promises);

            // This block will be executed after all promises are resolved



            return refrencePdfList;
        } catch (error) {
            console.error("Error", error);
        }



    }



    const onEditBtn = async (record) => {

        const value = record.documentLevel;
        let refList = []

        try {

            if (record.qmsAccess) {
                if (value === 'DL1') {
                    getAllRefrences('DL2');

                } else if (value === 'DL2') {
                    getAllRefrences('DL3');

                } else if (value === 'DL3') {
                    getAllRefrences('DL4');

                }
                else if (value === 'DL4') {
                    setRefrenceOptions([]);

                }

                refList = await getReffrencedList(record);
                setRefPdfList(refList);

            }

            const momentDate = moment(record.date); // Convert the date string to a moment object

            setInitialDateValue(momentDate.isValid() ? momentDate : null);
            setTimeout(() => {
                form.setFieldsValue({ ...record, date: momentDate, refrences1: refList });
                setEditDialogVisible(true);
            }, 0);

            const tags = record.keywords;
            setQmsAccess(record.qmsAccess);
            setTags(tags.split(","));
            setEditRecord(record);

        } catch (error) {
            console.error("Error", error);
        }
    }

    const onDeleteBtn = record => {

        let endPath = webAPI.pdfFileDelete;

        if (qmsAccessCirculars) {
            endPath = webAPI.qmsPdfFileDelete;
        }


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
                axios.delete(appURLs.web + endPath + record._id).then((res) => {

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
            ellipsis: true,
            render: text => (
                <div>
                    {text.split(',').map((tag, index) => (
                        index < 2 && (
                            <Tag key={index} color="green">
                                {tag.trim()}
                            </Tag>
                        )

                    ))}
                </div>
            ),
        },
        {
            title: 'Action',
            dataIndex: '',
            key: 'x',
            width: '25%',
            render: record => <div style={{ textAlign: 'center', display: 'flex', "placeContent": 'space-evenly' }}>

                <EditButton onClick={() => onEditBtn(record)} />
                <DeleteButton onClick={() => onDeleteBtn(record)} />

            </div>,
        },

    ];



    useEffect(() => {
        getAllCirculars();
    }, [qmsAccessCirculars]);

    useEffect(() => {

        getAllCirculars();

    }, []);

    const onCancel = async () => {

        await modalHandleClear();
        setEditDialogVisible(false);

    };

    const getAllRefrences = (value) => {


        setLoaderStatus(true)
        axios.post(appURLs.web + webAPI.viewAllByDocumentLevel, { documentLevel: value })
            .then((res) => {

                if (res.status === 200) {

                    const refrenceOptions = res.data.map(item => ({
                        value: item._id,
                        label: item.sin_title
                    }));

                    setRefrenceOptions(refrenceOptions);
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

    const onDocLevelSelect = (value) => {

        setEditRecord((prevEditRecord) => ({
            ...prevEditRecord,
            subLevel: [],
        }));

        setTimeout(() => {

            form.resetFields(['subLevel']);
        }, 0);

        form.resetFields(['subLevel']);

        if (value === 'DL1') {
            getAllRefrences('DL2');
            setDocumentSubLevel(DL1_SubLevels)
        } else if (value === 'DL2') {
            getAllRefrences('DL3');
            setDocumentSubLevel(DL2_SubLevels)
        } else if (value === 'DL3') {
            getAllRefrences('DL4');
            setDocumentSubLevel(DL3_SubLevels)
        }
        else if (value === 'DL4') {
            setRefrenceOptions([]);
            setDocumentSubLevel(DL4_SubLevels)
        }

    }

    const modalHandleClear = async () => {
        setRefPdfList([]);
        form.resetFields(); // Reset form fields
        setQmsAccess('')
        setEditRecord('');
        setDocumentSubLevel([]);



        try {
            // Introduce a small delay before resetting form fields
            await new Promise(resolve => setTimeout(resolve, 0));
            form.resetFields();

        } catch (error) {
            console.error('Error resetting form fields:', error);
        }
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

                            form={formSearch}
                            name="pdfUploadForm"

                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 24 }}

                            layout='vertical'
                        >



                            <Row gutter={16}>
                                <Col lg={5} xs={24}>

                                    <Item
                                        label="QMS Access "
                                        name="qmsAccessCirculars"

                                        style={{ display: 'inline-flex', marginTop: '10px' }}
                                    >

                                        <Switch
                                            checked={qmsAccessCirculars}
                                            onChange={(checked) => setQmsAccessCirculars(checked)}
                                            checkedChildren="Granted"
                                            unCheckedChildren="Denied"
                                            style={{ marginTop: '-10px', backgroundColor: qmsAccessCirculars ? 'var( --theam-color)' : 'gray' }}
                                        />
                                    </Item>

                                </Col>
                                <Col lg={11} xs={24}>
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

                                <Col lg={8} xs={24}>
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

                        <Table columns={columns} dataSource={allCirculars} style={{ marginTop: '-30px' }}

                            pagination={{
                                pageSize: 10,
                            }}
                            scroll={{
                                y: screenHeight > 900 ? "90%" : 350,
                                x: true

                            }}

                            className={`${AccountCSS.customtable}`} />



                    </Content>
                </Col>
            </Row>
            <Modal
                title="Edit PDF"
                visible={isEditDialogVisible}
                onCancel={onCancel}
                onOk={() => form.submit()}
                width={'75%'}
                footer={null}
            >
                <Form
                    form={form}
                    name="pdfUploadForm"
                    onFinish={onFinish}
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    initialValues={{
                        qmsAccess: qmsAccess == null ? false : qmsAccess
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
                                <DatePicker style={{ width: '100%' }} defaultValue={initialDateValue} />
                            </Item>
                        </Col>
                    </Row>

                    <Item label="Key Words" name="keywords">
                        <div>
                            <div
                                style={{
                                    marginBottom: 16,
                                }}
                            >
                                {tags && tags.map((tag, index) => (
                                    <Tag
                                        key={tag}
                                        closable
                                        onClose={() => handleClose(tag)}
                                    >
                                        {tag}
                                    </Tag>
                                ))}
                            </div>
                            {inputVisible ? (
                                <Input
                                    ref={inputRef}
                                    type="text"
                                    size="small"
                                    style={{
                                        width: 78,
                                    }}
                                    value={inputValue}
                                    onChange={handleInputChange}
                                    onBlur={handleInputConfirm}
                                    onPressEnter={handleInputConfirm}
                                />
                            ) : (
                                <Tag onClick={showInput} style={tagPlusStyle}>
                                    <PlusOutlined /> New Tag
                                </Tag>
                            )}
                        </div>
                    </Item>


                    {qmsAccessCirculars && <Row gutter={16}>
                        <Col lg={12} xs={24}>

                            <Item
                                label="QMS Access"
                                name="qmsAccess"

                                style={{ display: 'inline-flex', marginTop: '10px' }}
                            >

                                <Switch
                                    disabled
                                    checked={qmsAccess}
                                    onChange={(checked) => setQmsAccess(checked)}
                                    checkedChildren="True"
                                    unCheckedChildren="False"
                                    style={{ marginTop: '-10px', backgroundColor: qmsAccess ? 'var( --theam-color)' : 'gray' }}
                                    defaultChecked={qmsAccess}
                                />
                            </Item>

                        </Col>

                    </Row>}

                    {qmsAccessCirculars && <><Divider orientation="left" orientationMargin="0" style={{ marginTop: '-25px' }}>PDF Accsess Details</Divider><Row gutter={16}>
                        <Col lg={12} xs={24}>
                            <Item
                                label="Document Accsess Level"
                                name="documentLevel"
                                rules={[{ required: true, message: 'Please select the Document Accsess Level!' }]}
                            >
                                <Select

                                    placeholder="Search to Select"
                                    onChange={(value) => onDocLevelSelect(value)}

                                    options={DocumentLevels} />
                            </Item>
                        </Col>
                        <Col lg={12} xs={24}>
                            <Item
                                label="Sub Level"
                                name="subLevel"
                                rules={[{ required: true, message: 'Please select the Sub Level!' }]}
                            >
                                <Select

                                    placeholder="Search to Select"

                                    options={documentSubLevel} />
                            </Item>
                        </Col>
                    </Row>
                        <Row>
                            <Col lg={12} xs={24}>
                                <Item
                                    label="Refrences"
                                    name="refrences1"

                                >

                                    <Select

                                        mode="multiple"
                                        allowClear
                                        showSearch
                                        placeholder="Select the Refrences"
                                        optionFilterProp="children"
                                        filterOption={(input, option) => (option?.label ?? '').includes(input)}
                                        filterSort={(optionA, optionB) =>
                                            (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                        }
                                        options={refrenceOptions}

                                    />
                                </Item>
                            </Col>
                        </Row></>

                    }

                    <Row style={{ marginBottom: "10px", }}>
                        <Col span={24} style={{ textAlign: 'right' }}>
                            <Button type="default" onClick={onCancel} style={{
                                marginRight: '8px',
                                backgroundcolor: isDarkMode ? 'var(--cancel-btn-bg-dark)' : 'var(--cancel-btn-bg-light)',
                                color: isDarkMode ? 'var( --cancel-btn-color-dark)' : 'var(--cancel-btn-color-light)'

                            }}>
                                <span style={{ fontWeight: '700' }}>CANCEL</span>
                            </Button>
                            <Button type="default" onClick={modalHandleClear} style={{
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
            </Modal>
            {loaderStatus && <Loader />}
        </div>
    );
}

export default PdfManage;