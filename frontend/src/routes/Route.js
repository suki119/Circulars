
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
import QmsAllCirculars from '../pages/QmsAllCirculars';
import UserProfile from '../pages/UserProfile';
import LogManagement from '../pages/LogManagement';

export const mainRoutes = [

  {
    path: '/dashboard',
    component: Dashboard,
    roles: ['admin', 'editor', 'user']
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
  },
  {
    path: '/logger',
    component: LogManagement,
    roles: ['admin', 'editor']
  },
  {
    path: '/allQmsCirculars',
    component: QmsAllCirculars,
    roles: ['admin', 'editor']

  },
  {
    path: '/userProfile',
    component: UserProfile,
    roles: ['admin', 'editor', 'user']

  },

  // Add more routes if needed
];

export const currentUserRoutes = () => {

  const filterRoutesByRoles = (routes, userRoles, currentUse) => {

    return routes.filter(route => {
      if (route.path === '/allQmsCirculars') {
        if (currentUse.qmsAccess === 'true') {
          return true
        } else {
          return false
        }


      } else if (route.path === '/allCirculars') {
        if (currentUse.circularsAccess === 'true') {
          return true
        } else {
          return false
        }
      }
      else {
        if (Array.isArray(route.roles)) {
          for (const role of route.roles) {
            if (userRoles.includes(role)) {
              return true;
            }
          }
        }
        return false;
      }


    });
  };

  const currentUse = authService.getCurrentUser();
  if (currentUse) {
    const filteredRoutes = filterRoutesByRoles(mainRoutes, currentUse.position, currentUse);
    return filteredRoutes;
  } else {
    return [];
  }

}

export const authRoutes = [

]

export const loginRoutes = ({ login, onLogin }) => (

  <Switch>
    <Route
      path="/login"
      render={() => <LoginContainer login={login} onLogin={onLogin} />}
    />
    <Route path="*" render={() => <LoginContainer login={login} onLogin={onLogin} />} />
  </Switch>
);


