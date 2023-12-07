import React, { useState, useRef, useEffect } from 'react';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import Swal from 'sweetalert2'
import axios from 'axios';
import { Breadcrumb, Layout, Divider, Row, Col, message, Space, Table } from 'antd';
import { Form, Input, Select, Button } from 'antd';
import '../../styles/common.css';
import { EyeFilled, EditFilled } from '@ant-design/icons';
import { themeColors } from '../../theme/variables';
import Loader from '../../component/commonComponent/Loader';
import { appURLs, webAPI } from '../../utils/api';
import ProductListMainUIComponent from '../../component/pagesComponent/ProductListMainUIComponent';

function ProductListMain({ isDarkMode }) {

    const [allAcounts, setAllProducts] = useState([]);
    const [userAttributes, setUserAttributes] = useState([]);
    const [loaderStatus, setLoaderStatus] = useState(false);

    const changeProductCategory = (selectedValue) => {
        let properText = ""; // Initialize an empty string for the proper text

        switch (selectedValue) {
            case "Film":
                properText = "Film";
                break;
            case "musicvideo":
                properText = "Music Video";
                break;
            case "shortfilm":
                properText = "Short Film";
                break;
            case "tvc":
                properText = "TVC";
                break;
            case "tvSeries":
                properText = "TV Series";
                break;
            case "other":
                properText = "Other";
                break;
            default:
                properText = ""; // Handle any other case, if needed
                break;
        }
        return properText;
    }

    const getAllProducts = () => {
        setLoaderStatus(true)
        axios.get(appURLs.web + webAPI.getProductData)
            .then((res) => {
                console.log("pp", res.data)
                if (res.data) {

                    setAllProducts(res.data.data);

                    const userAttributes = [];

                    res.data.data.forEach((productDto, index) => {
                        // Assuming productDto structure is similar to your example
                        const {
                            _id,
                            accountName,
                            productName,
                            productCategory,
                            productDetails,
                            productDiscription,
                            productStatus,
                            bagageData,
                        } = productDto;

                        const updatedProductCategory = changeProductCategory(productCategory)
                        const length = productCategory === 'tvSeries' ? productDetails + ' EP ' : productDetails + ' Min ' 

                        const bagageAttributes = bagageData.map((bagageItem, bagageIndex) => ({
                            key: `${index}-${bagageIndex}`,
                            bagageID: bagageItem.bagageID,
                            serialNumber: bagageItem.serialNumber,
                            type: bagageItem.type,
                            status: bagageItem.status,
                        }));

                        userAttributes.push({
                            key: index.toString(),
                            _id: _id, // Add the appropriate field from productDto
                            accountName: accountName,
                            productName: productName,
                            productCategory: updatedProductCategory,
                            productDetails: length,
                            productDescription: productDiscription,
                            productStatus: productStatus,
                            bagageData: bagageAttributes,
                        });
                    });


                    // Set userAttributes state
                    setUserAttributes(userAttributes);
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
        getAllProducts();
    }, []);

    return (
        <div>
            <ProductListMainUIComponent
                isDarkMode={isDarkMode}
                allProducts={userAttributes}
                loader={loaderStatus}
            />
        </div>
    );
}

export default ProductListMain;