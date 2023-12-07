import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

import MasterPage from './component/commonComponent/MasterPage';
import { loginRoutes } from './routes/Route';
import { useEffect } from 'react';

function App() {


  return (
    <Router>


      <MasterPage/>


    </Router>
  );
}

export default App;
