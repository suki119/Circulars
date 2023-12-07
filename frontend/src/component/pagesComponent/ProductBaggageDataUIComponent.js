import React, { useState , useEffect} from 'react';
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
    Table, // Import Table component
} from 'antd';
import AccountCSS from './account.module.css';
import { EyeFilled, EditFilled, UploadOutlined, PlusOutlined } from '@ant-design/icons';
import DeleteButton from '../commonComponent/Buttons/IconButtons/DeleteButton ';

const { TextArea } = Input;
const { Title } = Typography;
const { Option } = Select;
const { Item } = Form;
const { Header, Content } = Layout;
const { Panel } = Collapse;

function ProductBaggageDataUIComponent(props) {
    const screenWidth = window.innerHeight;
    const [form] = Form.useForm();
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [baggageData, setBaggageData] = useState([]);
    const [photoFiles, setPhotoFiles] = useState([]);



    console.log("baggae", baggageData)


    useEffect(() => {
        // Update the baggage data prop whenever the local baggage data changes.
        props.onBaggageDataChange(baggageData);
    }, [baggageData]);

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

    const onFinish = (values) => {
        // Handle form submission here
        props.onFormSubmit(values); // Pass the form values to the parent component
    };

    const onResetBtnClick = () => {
        form.resetFields();
    };

    const addBaggageEntry = () => {
        // Create a new baggage data entry object
        const newEntry = {

            baggageType: '',
            baggageSerialNo: '',
            remark: '',
            photoFiles: [], // Initialize an empty array for photo files
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

    const columns = [

        {
            title: 'Baggage Type',
            dataIndex: 'baggageType',
            key: 'baggageType',
            width: "15%",
            render: (text, record, index) => (
                <Select
                    style={{ width: '100%' }}
                    placeholder="Baggage Type"
                    value={text}
                    onChange={(value) => updateBaggageEntry(index, 'baggageType', value)}
                >
                    <Option value="Hard Drive">Hard Drive</Option>
                    <Option value="Pen">Pen</Option>
                    <Option value="CD">CD</Option>
                    <Option value="Other">Other</Option>
                </Select>
            ),
        },
        {
            title: 'Baggage Serial No',
            dataIndex: 'baggageSerialNo',
            key: 'baggageSerialNo',
            width: "20%",
            render: (text, record, index) => (
                <Input
                    placeholder="Baggage Serial No"
                    value={text}
                    onChange={(e) => updateBaggageEntry(index, 'baggageSerialNo', e.target.value)}
                />
            ),
        },
        {
            title: 'Remark',
            dataIndex: 'remark',
            key: 'remark',
            width: "20%",
            render: (text, record, index) => (
                <Input
                    placeholder="Remark"
                    value={text}
                    onChange={(e) => updateBaggageEntry(index, 'remark', e.target.value)}
                />
            ),
        },
        {
            title: 'Photo Upload',
            dataIndex: 'photoUpload',
            key: 'photoUpload',
            width: "15%",
            render: (text, record, index) => (
                <Upload
                    fileList={record.photoFiles}
                    beforeUpload={() => false}

                    onChange={(info) => {
                        const updatedBaggageData = [...baggageData];
                        updatedBaggageData[index].photoFiles = info.fileList;
                        setBaggageData(updatedBaggageData);
                        handlePhotoUpload(info.file);
                    }}
                    onRemove={(file) => deletePhotoFile(file)}
                >
                    <Button icon={<UploadOutlined />}>Click to Upload</Button>
                </Upload>
            ),
        },
        {
            title: 'Actions',
            dataIndex: 'actions',
            key: 'actions',
            width: "10%",
            render: (text, record, index) => (
                <DeleteButton onClick={() => deleteBaggageEntry(index)} />
            ),
        },
    ];






    return (
        <div>
            <Row gutter={16}>
                <Col lg={24} xs={24}>
                    <Table
                        dataSource={baggageData}
                        columns={columns}
                        pagination={false}
                        rowKey={(record, index) => index}
                        scroll={{

                            x: screenWidth > 960 ? false : true
                        }}
                    />

                    <Button style={{ width: '100%', marginTop: '20px', color: 'var(--save-btn-bg-light)', borderColor: 'var(--save-btn-bg-light)' }} type="dashed" onClick={addBaggageEntry} icon={<PlusOutlined />}>
                        <span style={{ fontWeight: '700' }}> Add Baggage Data</span>
                    </Button>
                </Col>
            </Row>
        </div>
    );
}

export default ProductBaggageDataUIComponent;
