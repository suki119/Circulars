import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Loader from '../component/commonComponent/Loader';
import Swal from 'sweetalert2'
import { appURLs, webAPI } from '../enums/urls';
import {  filePaths } from '../enums/constants';
import { Breadcrumb, Layout, Divider, Row, Col, message, Empty ,Space, Table } from 'antd';
import { Form, Input, Select, Button } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined, ExportOutlined } from '@ant-design/icons';
import AccountCSS from '../component/pagesComponent/account.module.css';
import './AllCirculars.css';
import { Document, Page } from "react-pdf/dist/esm/entry.webpack";

const { Item } = Form;
const { Header, Content } = Layout;
function AllCirculars({ selectedDivision, isDarkMode }) {

    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const [loaderStatus, setLoaderStatus] = useState(false);
    const [allCirculars, setAllCirculars] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchText, setSearchText] = useState('');
    const [searchDate, setsearchDate] = useState("");
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
    const [newCircularList, setNewCircularList] = useState([]);
    const [selectedRow, setSelectedRow] = useState(null);
    const [selectedPdfFile, setSelectedPdfFile] = useState(null);

    const getAllCirculars = () => {
        setLoaderStatus(true)
        axios.get(appURLs.web + webAPI.getAllCirculars)
            .then((res) => {
                console.log(res)
                if (res.status === 200) {

                    setAllCirculars(res.data);
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

        const currentPosts = allCirculars
            .filter((value) => {
                if (searchTerm === "" && selectedDivision === "" && searchDate === "") {
                    return value;
                } else if (
                    (value.eng_title.toLowerCase().includes(searchTerm.toLowerCase()) &&
                        value.division.toLowerCase().includes(selectedDivision.toLowerCase()) &&
                        value.date.includes(searchDate))

                    ||

                    (value.sin_title.toLowerCase().includes(searchTerm) &&
                        value.division.toLowerCase().includes(selectedDivision.toLowerCase()) &&
                        value.date.includes(searchDate))

                ) {

                    return value;
                }
            })
        let num = 0;
        const newList = currentPosts.map((post) => {
            const title = post.sin_title && post.eng_title
                ? post.sin_title // If both Sinhala and English titles are available, use Sinhala.
                : post.eng_title || post.sin_title; // If only one title is available, use it.
            num++
            return {
                number: num + '.',
                document: post.document,
                circularName: title
            };
        });
        setNewCircularList(newList)
        setSelectedPdfFile(null)
        setSelectedRow(null)


        console.log("set", currentPosts)

    }, [selectedDivision]);

    useEffect(() => {

        getAllCirculars();

    }, []);

    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
    };

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
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
            title: '',
            dataIndex: 'number',
            key: 'number',
            width: '5%',

        },
        {
            title: 'Circular Name',
            dataIndex: 'circularName',
            key: 'circularName',
            width: '95%',
            ...getColumnSearchProps('circularName'),
            ellipsis: true
        },


    ];
    const dataSource = newCircularList;
    const handleRowClick = record => {
        setSelectedRow(record.number); // Store the selected row ID
        setSelectedPdfFile(record.document)


    };
    const rowClassName = (record) => {
        let classes = 'pointer'; // Adding 'pointer' class
        if (record.number === selectedRow) {
            classes += ' selected-row'; // Adding 'selected-row' class for the selected row
        }
        return classes;
    };



    return (
        console.log('height',screenHeight,' wifth',screenWidth),
        <>
            <Breadcrumb style={{ margin: '10px 0' }}>
                <Breadcrumb.Item>All Circulars</Breadcrumb.Item>
                <Breadcrumb.Item>{selectedDivision}</Breadcrumb.Item>

            </Breadcrumb>

            <Row gutter={[16, 16]}>

                <Col xs={24} lg={14}>
                    <Content
                        className="common-cotent-container"
                        style={{
                            background: isDarkMode ? 'var(--content-container-bg-dark)' : 'var(--content-container-bg-light)',
                        }}
                    >
                        <Divider orientation="left" orientationMargin="0">All Circulars</Divider>


                        <Table
                            dataSource={dataSource}
                            columns={columns.map(column => {
                                if (column.dataIndex === 'circularName') {
                                    return {
                                        ...column,
                                        render: text => <div style={{ whiteSpace: 'pre-line' }}>{text}</div>
                                    };
                                }
                                return column;
                            })}
                            pagination={{ pageSize: 10 }}
                            scroll={{
                                y: screenHeight > 960 ? 600 : 350,
                                x: screenHeight > 960 ? false : true

                            }}
                            rowClassName={rowClassName}

                            onRow={(record) => ({
                                onClick: () => {
                                    handleRowClick(record);
                                }
                            })}
                            className={`${AccountCSS.customtable}`}
                        />

                    </Content>
                </Col>

                <Col xs={24} lg={10}>
                    <Content
                        className="common-cotent-container"
                        style={{
                            background: isDarkMode ? 'var(--content-container-bg-dark)' : 'var(--content-container-bg-light)',
                        }}
                    >
                        <Divider orientation="left" orientationMargin="0">{selectedPdfFile ? <Button
                            type="text"
                            icon={<ExportOutlined />}
                            onClick={() => window.open(filePaths.FILE_SAVE_BASE_PATH  + selectedPdfFile, '_blank')}
                        >
                            <span style={{ fontWeight: '500', fontSize: '16px' }}>Open in New Tab</span>
                        </Button> : 'Selected Pdf File'}</Divider>



                        {selectedPdfFile ? <div className="pdf-container">

                            <iframe

                                title="PDF Viewer"
                                width="100%"
                                height={screenHeight > 960 ? '700' : '400'}
                                src={filePaths.FILE_SAVE_BASE_PATH + selectedPdfFile}
                                allowFullScreen
                                frameBorder="0"
                            ></iframe>
                        </div>
                            : <div style={{padding:'80px'}}><Empty /></div>}
                    </Content>
                </Col>


            </Row>

            {loaderStatus && <Loader />}
        </>

    );
}

export default AllCirculars;