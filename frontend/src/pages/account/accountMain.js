import React, { useState, useRef, useEffect } from 'react';
import AccountMainUIComponent from '../../component/pagesComponent/AccountMainUIComponent';
import Swal from 'sweetalert2'
import axios from 'axios';


import { appURLs, webAPI } from '../../utils/api';

function AccountMain({isDarkMode }) {

  const [allAcounts, setAllAcounts] = useState([]);
  const [userAttributes, setUserAttributes] = useState([]);
  const [formValues, setFormValues] = useState({});
  const [loaderStatus, setLoaderStatus] = useState(false);
  

  

  console.log("mood", isDarkMode);

  // Callback function to receive form values
  const handleFormSubmit = (values) => {
    setFormValues(values); // Store the form values in the state

    // Create a new data object with the desired structure
    const newDataObject = {
      HolderName: values.CompanyName, // Use the value from CompanyName
      HolPhonenumber: values.CompanyPhonenumber, // Use the value from CompanyPhonenumber
      CompanyName: values.CompanyName, // Use the value from CompanyName
      CompanyEmailAddress: values.CompanyEmailAddress, // Use the value from CompanyEmailAddress
      CompanyPhonenumber: values.CompanyPhonenumber, // Use the value from CompanyPhonenumber
      CompanyAddress: `${values.address1}, ${values.address2}, ${values.address3}`, // Combine address fields
      country: values.country
    };
    setLoaderStatus(true)
    axios.post(appURLs.web + webAPI.postAccountData, newDataObject)
    .then((res) => {
      if (res.data.status) {
        Swal.fire(
          values.CompanyName + ' Added!',
          'Your Account has been Added.',
          'success'
        );
        getAccountDetails();
        setLoaderStatus(false)
      }
    })
    .catch((error) => {
      console.error("Error", error);
      setLoaderStatus(false)
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Network Error',
        showConfirmButton: false,
        timer: 1500,
        width:10
      });
    });


};

  const getAccountDetails = () => {
    setLoaderStatus(true)
    axios.get(appURLs.web + webAPI.getAccountData)
      .then((res) => {
        if (res.data.status) {

          setAllAcounts(res.data.data);

          const userAttributes = [];

          res.data.data.forEach((accountDto, index) => {
            userAttributes.push({
              key: index.toString(),
              companyName: accountDto.CompanyName,
              phoneNo: accountDto.CompanyPhonenumber,
              email: accountDto.CompanyEmailAddress,

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
    getAccountDetails();
  }, []);




  return (

    <AccountMainUIComponent
      allAcounts={userAttributes}
      onFormSubmit={handleFormSubmit}
      loader={loaderStatus}
      isDarkMode = {isDarkMode}
    />

    

  );
}

export default AccountMain;