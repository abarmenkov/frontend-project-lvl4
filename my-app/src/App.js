import React from 'react';
import {
  BrowserRouter as Router,
  Route, Routes, useLocation, Navigate,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Login from './components/LoginPage.jsx';
import useAuth from './hooks/useAuth.jsx';
import NotFoundPage from './components/NotFoundPage.jsx';
import Chat from './components/Chat.jsx';
import Header from './components/Header.jsx';
import SignUp from './components/SignUp.jsx';
import 'react-toastify/dist/ReactToastify.css';
import routes from './routes.js';

const PrivateRoute = ({ children }) => {
  const auth = useAuth();
  const location = useLocation();

  return (
    auth.loggedIn ? children : <Navigate to={routes.loginPage()} state={{ from: location }} />
  );
};

const AuthRoute = ({ children }) => {
  const { loggedIn } = useAuth();
  return (
    loggedIn ? <Navigate to={routes.homePage()} /> : children
  );
};

const App = () => (
  <div
    className="h-100 d-flex flex-column"
  >

    <Router>

      <Header />

      <Routes>
        <Route path={routes.homePage()} element={<PrivateRoute><Chat /></PrivateRoute>} />
        <Route path={routes.loginPage()} element={<AuthRoute><Login /></AuthRoute>} />
        <Route path={routes.signUpPage()} element={<AuthRoute><SignUp /></AuthRoute>} />
        <Route path={routes.notFoundPage()} element={<NotFoundPage />} />
      </Routes>

      <ToastContainer />
    </Router>
  </div>
);

export default App;
