import React from 'react';
import { Navbar, Button, Container } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import useAuth from '../hooks/useAuth.jsx';

const AuthButton = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'header' });
  const auth = useAuth();
  return (
    auth.loggedIn
      ? (
        <>
          <div className="ms-auto me-4">{auth.getUsername()}</div>
          <Button onClick={auth.logOut}>{t('logOut')}</Button>
        </>
      )
      : null
  );
};

const Header = () => (
  <div className="shadow-sm bg-white">
    <Container className="d-flex justify-content-between align-items-center">
      <Navbar expand="lg">
        <Navbar.Brand href="/">Hexlet Chat</Navbar.Brand>
      </Navbar>

      <AuthButton />

    </Container>
  </div>

);

export default Header;
