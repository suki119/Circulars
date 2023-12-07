import React, { useState, useRef, useEffect } from 'react';
import ProductAddMainUIComponent from '../../component/pagesComponent/ProductAddMainUIComponent';
import Loader from '../../component/commonComponent/Loader';
import Swal from 'sweetalert2'
import axios from 'axios';
import { appURLs, webAPI } from '../../utils/api';

function AddProductMain({ isDarkMode }) {

    const [allAcounts, setAllProducts] = useState([]);
    const [userAttributes, setUserAttributes] = useState([]);
    const [loaderStatus, setLoaderStatus] = useState(false);



    const handleFormSubmit = (values) => {
        //setFormValues(values); // Store the form values in the state
        console.log("product", values)
    }

    const getAllAcounts = () => {
        setLoaderStatus(true)
        axios.get(appURLs.web + webAPI.getAccountData)
            .then((res) => {
                console.log("pp", res.data)
                if (res.data) {

                    setAllProducts(res.data.data);

                    const userAttributes = [];

                    res.data.data.forEach((accountDto, index) => {
                        userAttributes.push({

                            value: accountDto._id,
                            label: accountDto.CompanyName,
                        })

                    })




                    setUserAttributes(userAttributes);
                    setLoaderStatus(false)

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
    };


    // const getLastBaggageId = () => {
    //     setLoaderStatus(true);
    //     axios.get(appURLs.web + webAPI.getLastBagageID).then((res) => {

    //         if(res.status === 200){

    //         }


    //     }).catch((error) => {
    //         setLoaderStatus(false)
    //         Swal.fire({
    //             position: 'top-end',
    //             icon: 'error',
    //             title: 'Network Error',
    //             showConfirmButton: false,
    //             timer: 1500,
    //         });
    //         console.error("Error", error);
    //     });
    // }


    useEffect(() => {
        getAllAcounts();


    }, []);


    return (
        <div>
            <ProductAddMainUIComponent
                isDarkMode={isDarkMode}
                allAcounts={userAttributes}
                onFormSubmit={handleFormSubmit}

            />
        </div>
    );
}

export default AddProductMain;