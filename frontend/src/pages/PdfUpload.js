import React, { useEffect, useRef, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import TweenOne from 'rc-tween-one';
import { TweenOneGroup } from 'rc-tween-one';
import { Breadcrumb, Layout, Divider, Row, Col, message, Empty, Space, Table, Checkbox, Tag, theme, Switch } from 'antd';
import { Form, Input, Select, Button, DatePicker, Upload, message as AntMessage } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import moment from 'moment';
import { divisions } from '../enums/constants'
import axios from "axios";
import Swal from 'sweetalert2'
import { appURLs, webAPI } from '../enums/urls';
import Loader from '../component/commonComponent/Loader';
import { BrowserRouter as Router, Route, Link, useHistory } from 'react-router-dom';
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

function PdfUpload({ isDarkMode }) {
    const { token } = theme.useToken();
    const [form] = Form.useForm();
    const [loaderStatus, setLoaderStatus] = useState(false);
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [inputVisible, setInputVisible] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const inputRef = useRef(null);
    const [tags, setTags] = useState(['Tag 1']);
    const [documentSubLevel, setDocumentSubLevel] = useState([]);
    const [qmsAccess, setQmsAccess] = useState(false);
    const [refrenceOptions, setRefrenceOptions] = useState([]);


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

    async function postPdfData(formData, config, values) {

        const endPath = values.qmsAccess ? webAPI.qmsPdfFileInsert : webAPI.pdfFileInsert;

        setLoaderStatus(true)
        let res = await axios.post(appURLs.web + endPath, formData, config)
            .then((res) => {
                if (res.status === 200) {
                    setLoaderStatus(false)
                    setLoading(false);

                }

                history.push('/allCirculars');
            })
            .catch((error) => {
                setLoading(false);
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
        return res
    }

    const onFinish = async (values) => {

        setLoading(true);
        // Handle form submission here

      
        const pdfFileData = values.pdfUpload[0].originFileObj;

        const formData = new FormData();

        if (values.qmsAccess) {

            formData.append("qmsAccess", values.qmsAccess);
            formData.append("subLevel", values.subLevel);
            formData.append("documentLevel", values.documentLevel);
            formData.append("unite", values.division);
            formData.append("refrences", values.refrences);

        }

        formData.append("eng_title", values.pdfTitle);
        formData.append("sin_title", values.pdfTitle);
        formData.append("division", values.division);
        formData.append("keywords", tags);
        formData.append("date", values.date);
        formData.append("document", pdfFileData);




        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };

        await postPdfData(formData, config, values)

    };

    const normFile = (e) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    };

    const handleClear = () => {
        setRefrenceOptions([])
        setDocumentSubLevel([])
        form.resetFields(); // Reset form fields
    };

    return (
        <div>
            <Breadcrumb style={{ margin: '10px 0' }}>
                <Breadcrumb.Item>PDF Management</Breadcrumb.Item>
                <Breadcrumb.Item>PDF Upload</Breadcrumb.Item>
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



                        <Divider orientation="left" orientationMargin="0">PDF File Upload</Divider>

                        <Form

                            form={form}
                            name="pdfUploadForm"
                            onFinish={onFinish}
                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 24 }}
                            shouldUpdate={() => false}
                            layout='vertical'
                        >
                            <Item
                                label="PDF Title"
                                name="pdfTitle"
                                rules={[{ required: true, message: 'Please input the PDF title!' }]}
                            >
                                <Input />
                            </Item>
                            <Row gutter={16}>
                                <Col lg={12} xs={24}>
                                    <Item
                                        label="Division"
                                        name="division"
                                        rules={[{ required: true, message: 'Please select the division!' }]}
                                    >
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
                                    <Item
                                        label="Date"
                                        name="date"
                                        rules={[{ required: true, message: 'Please select the date!' }]}
                                    >
                                        <DatePicker style={{ width: '100%' }} />
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
                                        {tags.map((tag, index) => (
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

                            <Item
                                label="PDF Upload"
                                name="pdfUpload"
                                valuePropName="fileList"
                                getValueFromEvent={normFile}
                                extra="Drag and drop your PDF file here or click to browse"
                                rules={[{ required: true, message: 'Please Upload a PDF File!' }]}
                            >
                                <Dragger name="file" multiple={false} >
                                    <p className="ant-upload-drag-icon">
                                        <InboxOutlined style={{ color: isDarkMode ? 'var( --cancel-btn-color-dark)' : 'var(--cancel-btn-color-light)' }} />
                                    </p>
                                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                                    <p className="ant-upload-hint">Support for a single PDF file.</p>
                                </Dragger>
                            </Item>


                            <Row gutter={16}>
                                <Col lg={12} xs={24}>

                                    <Item
                                        label="QMS Access"
                                        name="qmsAccess"

                                        style={{ display: 'inline-flex', marginTop: '10px' }}
                                    >

                                        <Switch
                                            checked={qmsAccess}
                                            onChange={(checked) => setQmsAccess(checked)}
                                            checkedChildren="True"
                                            unCheckedChildren="False"
                                            style={{ marginTop: '-10px', backgroundColor: qmsAccess ? 'var( --theam-color)' : 'gray' }}
                                        />
                                    </Item>

                                </Col>

                            </Row>



                            {qmsAccess && <><Divider orientation="left" orientationMargin="0" style={{ marginTop: '-25px' }}>PDF Accsess Details</Divider><Row gutter={16}>
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
                                            name="refrences"

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
                                </Row>
                            </>

                            }


                            {/* <Item name="confirmation" valuePropName="checked" >
                                <Checkbox>All Details are Correct</Checkbox>
                            </Item> */}

                            <Row style={{ marginTop: "20px", marginBottom: '20px' }}>
                                <Col span={24} style={{ textAlign: 'right' }}>
                                    <Button type="default" onClick={handleClear} style={{
                                        marginRight: '8px',
                                        backgroundcolor: isDarkMode ? 'var(--cancel-btn-bg-dark)' : 'var(--cancel-btn-bg-light)',
                                        color: isDarkMode ? 'var( --cancel-btn-color-dark)' : 'var(--cancel-btn-color-light)'

                                    }}>
                                        <span style={{ fontWeight: '700' }}>RESET</span>
                                    </Button>
                                    <Button type="primary" htmlType="submit" loading={loading} disabled={loading} className="common-save-btn common-btn-color">
                                        <span style={{ fontWeight: '600' }}>SAVE</span>
                                    </Button>
                                </Col>
                            </Row>
                        </Form>
                    </Content>
                </Col>
            </Row>
            {loaderStatus && <Loader />}
        </div>
    );
}

export default PdfUpload;
