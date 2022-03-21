import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';

import { useAuth } from './hooks/auth-hook';
import { AuthContext } from './context/auth-context'

import JobApplication from './pages/job-application';
import AllApplications from './admin-HR/pages/All-Applications';
import ApplicationDetails from './admin-HR/pages/application-details';
import Login from './pages/login';
import Register from './pages/signup';

import PrivateRoute from './Private-Route/PrivateRoute';

function App() {

  const { token, login, logout, userId } = useAuth();

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        login: login,
        logout: logout
      }}
    >
      <Router>
        <Switch>
          <Route path="/" exact>
            <JobApplication />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <PrivateRoute path="/admin-HR" component={AllApplications} />
          <Route path="/signup">
            <Register />
          </Route>
          <Route path="/:applId" >
            <ApplicationDetails />
          </Route>
          <Redirect to="/" />
        </Switch>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
