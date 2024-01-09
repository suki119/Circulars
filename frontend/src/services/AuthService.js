import axios from "axios";
import { appURLs, webAPI } from '../enums/urls';
import jwt_decode from "jwt-decode";
import Cookies from 'js-cookie';
import React, { useState, useEffect } from 'react';



function setCoockieData(jwtToken) {

  // Cookies.set('jwtToken', jwtToken, { expires: 1, secure: true, sameSite: 'Strict' });
  // // Cookies.set('jwtToken', jwtToken, { expires: 5 / (60 * 60 * 24), secure: true, sameSite: 'Strict' });
  // const jwtTokenFromCookie = Cookies.get('jwtToken');
  localStorage.setItem("U#T",JSON.stringify(jwtToken));
  
}


const insertLoggerData = (name) => {


  axios.post(appURLs.web + webAPI.insertAllLogs, { userId: name })
    .then((res) => {

      if (res.status == 200) {

      
        localStorage.setItem("12345",res.data);

      }

    })
    .catch((error) => {
      console.error("Error", error);

    });

}

const login = async (email, password) => {

  const response = await axios.post(appURLs.web + webAPI.login, {
    email,
    password,
  });

  if (response.data.token) {

    setCoockieData(response.data.token);
    insertLoggerData(email)

  }

  return response;
};


const getCurrentUser = () => {
  const jwtToken = JSON.parse(localStorage.getItem("U#T"));
  

  if (jwtToken) {
    const decodedUser = jwt_decode(jwtToken);
    return decodedUser;

  } else {

    // window.location.pathname = "/login";

    return false;
  }
};


const insertLogOutData = () => {


  axios.put(appURLs.web + webAPI.updateLogs + localStorage.getItem("12345"))
    .then((res) => {

      if (res.status == 200) {
        localStorage.removeItem("U#T");

      }

    })
    .catch((error) => {
      console.error("Error", error);

    });

}

const logout = () => {
 
  insertLogOutData()
  localStorage.removeItem("U#T");
  localStorage.removeItem("12345");
  // Cookies.remove('jwtToken');

};

const pageValidator = () => {

  const dashboardRoute = ['/userUpload', '/pdfManage', '/pdfUpload', '/Dashboard', '/home'];
  const route = window.location.pathname;
  const user = getCurrentUser();

  const isDashboardRoute = dashboardRoute.includes(route);

  if (isDashboardRoute) {
    if (user.position !== 'admin' && user.position !== 'editor') {
      window.location.pathname = "/landing";
    }

  }
};


export const authService = {
  login,
  getCurrentUser,
  logout,
  pageValidator
};