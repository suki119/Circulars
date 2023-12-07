import accountMain from '../pages/account/accountMain';
import productListMain from '../pages/product/productListMain';
import AddProductMain from '../pages/product/AddProductMain';
import LoginContainer from '../container/LoginContainer';
import { Route, Switch } from 'react-router-dom';
import AllCirculars from '../pages/AllCirculars';
import PdfUpload from '../pages/PdfUpload';
import PdfManage from '../pages/PdfManage';
import Login from '../pages/Login';
import UserUpload from '../pages/UserUpload';
import LandingPage from '../pages/LandingPage';
import UserManage from '../pages/UserManage';
import { authService } from '../services/AuthService';
import Dashboard from '../pages/Dashboard';

export const mainRoutes = [
  {
    path: '/account',
    component: accountMain,
    roles: ['admin', 'editor']
  },
  {
    path: '/dashboard',
    component: Dashboard,
    roles: ['admin', 'editor']
  },
  {
    path: '/pdfUpload',
    component: PdfUpload,
    roles: ['admin', 'editor']
  },
  {
    path: '/pdfManage',
    component: PdfManage,
    roles: ['admin', 'editor']
  },
  {
    path: '/product',
    component: productListMain,
    roles: ['admin', 'editor']
  },
  {
    path: '/add-product',
    component: AddProductMain,
    roles: ['admin', 'editor']
  },
  {
    path: '/allCirculars',
    component: AllCirculars,
    roles: ['admin', 'editor', 'user']

  },
  {
    path: '/userUpload',
    component: UserUpload,
    roles: ['admin', 'editor']
  },
  {
    path: '/userManage',
    component: UserManage,
    roles: ['admin', 'editor']
  },
  {
    path: '/landing',
    component: LandingPage,
    roles: ['admin', 'editor']
  }

  // Add more routes if needed
];

export const currentUserRoutes = () => {

  const filterRoutesByRoles = (routes, userRoles) => {

    return routes.filter(route => {

      if (Array.isArray(route.roles)) {
        for (const role of route.roles) {
          if (userRoles.includes(role)) {
            return true;
          }
        }
      }
      return false;
    });
  };

  const currentUse = authService.getCurrentUser();
  if (currentUse) {
    const filteredRoutes = filterRoutesByRoles(mainRoutes, currentUse.position);
    return filteredRoutes;
  } else {
    return [];
  }

}

export const authRoutes = [

]

export const loginRoutes = ({ login, onLogin }) => (
  console.log(login),
  <Switch>
    <Route
      path="/login"
      render={() => <LoginContainer login={login} onLogin={onLogin} />}
    />
    <Route path="*" render={() => <LoginContainer login={login} onLogin={onLogin} />} />
  </Switch>
);


