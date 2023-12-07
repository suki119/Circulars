import React, { useState } from 'react';
import {
    Breadcrumb,
    Layout,
    Divider,
    Row,
    Col,
    Select,
    Form,
    Input,
    Button,
    Typography,
    InputNumber,
    Collapse,
    Upload,
    message,
    Tag,
    Switch
} from 'antd';
import AccountCSS from './account.module.css';
import { EyeFilled, EditFilled, UploadOutlined, PlusOutlined } from '@ant-design/icons';
import ProductBaggageDataUIComponent from './ProductBaggageDataUIComponent';

const { TextArea } = Input;
const { Title } = Typography;
const { Option } = Select;
const { Item } = Form;
const { Header, Content } = Layout;
const { Panel } = Collapse;

function ProductAddMainUIComponent(props) {
    const screenWidth = window.innerHeight;

    const [form] = Form.useForm();
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [baggageData, setBaggageData] = useState([]);
    const [photoFiles, setPhotoFiles] = useState([]);
    const [skipBaggageData, setSkipBaggageData] = useState(true);

    const onchangeToggale = (checked) => {
        // Update the state based on the checked value
        setSkipBaggageData(checked);
      };


      const onFinish = (values) => {
        // Handle form submission here

        values.baggageData = baggageData;
        props.onFormSubmit(values); // Pass the form values to the parent component

    };


    const productCategory = [
        { label: "Film", value: "Film" },
        { label: "Music Video", value: "musicvideo" },
        { label: "Short Film", value: "shortfilm" },
        { label: "TVC", value: "tvc" },
        { label: "TV Series", value: "tvSeries" },
        { label: "Other", value: "other" }
    ];

    const handleCategoryChange = (value) => {
        setSelectedCategory(value);
    };

   

    const onResetBtnClick = () => {
        form.resetFields();
    };

    const addBaggageEntry = () => {
        // Create a new baggage data entry object
        const newEntry = {
            baggageID: '',
            baggageType: '',
            baggageSerialNo: '',
            remark: '',
        };

        // Add the new entry to the baggage data state
        setBaggageData([...baggageData, newEntry]);
    };

    const deleteBaggageEntry = (index) => {
        // Remove the selected baggage data entry
        const updatedBaggageData = [...baggageData];
        updatedBaggageData.splice(index, 1);
        setBaggageData(updatedBaggageData);
    };

    const updateBaggageEntry = (index, field, value) => {
        // Update a specific field in a baggage data entry
        const updatedBaggageData = [...baggageData];
        updatedBaggageData[index][field] = value;
        setBaggageData(updatedBaggageData);
    };

    const handlePhotoUpload = (file) => {
        // Handle file upload logic here
        message.success(`${file.name} file uploaded successfully`);

        // Add the uploaded photo file to the state
        setPhotoFiles([...photoFiles, file]);
    };

    const deletePhotoFile = (file) => {
        // Remove the selected photo file
        const updatedPhotoFiles = photoFiles.filter((item) => item.uid !== file.uid);
        setPhotoFiles(updatedPhotoFiles);
    };

    return (
        <div>
            <Breadcrumb style={{ margin: '10px 0' }}>
                <Breadcrumb.Item>Product</Breadcrumb.Item>
                <Breadcrumb.Item>List</Breadcrumb.Item>
            </Breadcrumb>

            <Content
                className="common-cotent-container"
                style={{
                    background: props.isDarkMode ? 'var(--content-container-bg-dark)' : 'var(--content-container-bg-light)',
                }}
            >
                <Divider orientation="left" orientationMargin="0">Add Product Details</Divider>
                <Form
                    form={form}
                    onFinish={onFinish}
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    layout="vertical"
                >
                    <Row gutter={16}>
                        <Col lg={12} xs={24}>
                            <Item
                                label="Company Name"
                                name="CompanyName"
                                rules={[
                                    { required: true, message: 'Please select the company name' },
                                ]}
                            >
                                <Select
                                    showSearch
                                    placeholder="Search to Select"
                                    optionFilterProp="children"
                                    filterOption={(input, option) => (option?.label ?? '').includes(input)}
                                    filterSort={(optionA, optionB) =>
                                        (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                    }
                                    options={props.allAcounts}
                                />
                            </Item>
                        </Col>
                        <Col lg={12} xs={24}>
                            <Item
                                label="Product Name"
                                name="ProductName"
                                rules={[{ required: true, message: 'Please enter the product name' }]}
                            >
                                <Input />
                            </Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col lg={12} xs={24}>
                            <Item
                                label="Category"
                                name="Category"
                                rules={[
                                    { required: true, message: 'Please select the category' },
                                ]}
                            >
                                <Select options={productCategory} onChange={handleCategoryChange} />
                            </Item>
                        </Col>
                        <Col lg={12} xs={24}>
                            <Item
                                label="Length"
                                name="Length"
                                rules={[{ required: true, message: 'Please enter the product length' }]}
                            >
                                <InputNumber
                                    min={1}
                                    addonAfter={selectedCategory === 'tvSeries' ? 'Episodes' : 'Minutes'}
                                    style={{
                                        width: '100%',
                                    }}
                                />
                            </Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col lg={24} xs={24}>
                            <Item label="Description" name="Description">
                                <TextArea rows={2} />
                            </Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col lg={24} xs={24}>
                            <Form.Item label="Skip Baggage Data">
                                <Switch checkedChildren="True" unCheckedChildren="False" defaultChecked onChange={onchangeToggale} />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Collapse collapsible={skipBaggageData ?"disabled":"not"} >
                        <Panel header="Hard Drive Details" key="1">
                            <ProductBaggageDataUIComponent baggageData={baggageData} onBaggageDataChange={setBaggageData} />
                        </Panel>
                    </Collapse>

                    <Row style={{ marginTop: "20px" }}>
                        <Col span={24} style={{ textAlign: 'right' }}>
                            <Button type="default" onClick={onResetBtnClick} style={{
                                marginRight: '8px',
                                backgroundcolor: props.isDarkMode ? 'var(--cancel-btn-bg-dark)' : 'var(--cancel-btn-bg-light)',
                                color: props.isDarkMode ? 'var( --cancel-btn-color-dark)' : 'var(--cancel-btn-color-light)'

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
        </div>
    );
}

export default ProductAddMainUIComponent;
