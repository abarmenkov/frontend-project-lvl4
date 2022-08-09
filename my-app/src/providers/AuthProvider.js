import React, { useCallback, useState } from 'react';
import AuthContext from '../contexts/AuthContext.js';

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem('user'));

  const logIn = useCallback(() => {
    setLoggedIn(true);
  }, []);

  const logOut = useCallback(() => {
    localStorage.removeItem('user');
    setLoggedIn(false);
  }, []);

  const getUsername = useCallback(() => {
    const { username } = JSON.parse(localStorage.getItem('user'));
    return username;
  }, []);

  const getAuthHeader = useCallback(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.token) {
      return { headers: { Authorization: `Bearer ${user.token}` } };
    }
    return {};
  }, []);

  const value = React.useMemo(() => ({
    loggedIn, logIn, logOut, getUsername, getAuthHeader,
  }), [loggedIn, logIn, logOut, getUsername, getAuthHeader]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
