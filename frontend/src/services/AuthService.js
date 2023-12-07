import axios from "axios";
import { appURLs, webAPI } from '../enums/urls';
import jwt_decode from "jwt-decode";
import Cookies from 'js-cookie';



function setCoockieData(jwtToken) {
  Cookies.set('jwtToken', jwtToken, { expires: 1 , secure: true, sameSite: 'Strict' });
  // Cookies.set('jwtToken', jwtToken, { expires: 5 / (60 * 60 * 24), secure: true, sameSite: 'Strict' });
  const jwtTokenFromCookie = Cookies.get('jwtToken');
  console.log('jwtToken',jwtTokenFromCookie)
}

const login = async (email, password) => {

  const response = await axios.post(appURLs.web + webAPI.login, {
    email,
    password,
  });

  if (response.data.token) {
    // loginlogger(email);
    setCoockieData(response.data.token);
    // localStorage.setItem("user", JSON.stringify(response.data.token));

  }
  return response.data;
};


const getCurrentUser = () => {
  const jwtToken = Cookies.get('jwtToken');

  if (jwtToken) {
    const decodedUser = jwt_decode(jwtToken);
    return decodedUser;
  } else {
    
    // window.location.pathname = "/login";
    
    return false;
  }
};


const logout = () => {

  localStorage.removeItem("user");
  Cookies.remove('jwtToken');

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