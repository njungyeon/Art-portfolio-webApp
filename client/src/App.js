import React, { Suspense } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import LandingPage from './components/views/LandingPage/LandingPage';
import LoginPage from './components/views/LoginPage/LoginPage';
import RegisterPage from './components/views/RegisterPage/RegisterPage';
import Footer from './components/views/Footer/Footer';
import NavBar from './components/views/NavBar/NavBar';
import IntroducePage from './components/IntroducePage/IntroducePage';
import RegisterStuPage from './components/views/RegisterStuPage/RegisterStuPage';
import ModifyStuPage from './components/views/ModifyStuPage/ModifyStuPage';

import Auth from './hoc/auth';

function App() {
  return (
    <Suspense fallback={(<div>Loading...</div>)}>
      <NavBar />
      <div style={{ paddingTop: '75px', minHeight: 'calc(100vh - 80px)' }}>
        <Switch>
          <Route exact path="/" component={Auth(LandingPage, null)} />
          <Route exact path="/login" component={Auth(LoginPage, false)} />
          <Route exact path="/register" component={Auth(RegisterPage, false)} />
          <Route exact path="/registerStu" component={Auth(RegisterStuPage, null)} />
          <Route exact path="/introduce" component={Auth(IntroducePage, null)} />  
          <Route exact path="/modifyStuPage" component={Auth(ModifyStuPage, null)} />
        </Switch>
      </div>
      <Footer />
      </Suspense>
  );
}

export default App;