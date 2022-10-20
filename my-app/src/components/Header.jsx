import React from 'react';
import {
  Navbar, Button, Container, Form,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
// import 'flag-icon-css/css/flag-icons.min.css';
// import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
// import Tooltip from 'react-bootstrap/Tooltip';
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

const Header = () => {
  // const { t } = useTranslation('translation', { keyPrefix: 'header' });
  const { i18n } = useTranslation();
  // const [lang, setLang] = useState(i18n.resolvedLanguage);
  const lang = i18n.resolvedLanguage;
  const changeLanguage = (e) => {
    e.preventDefault();
    i18n.changeLanguage(e.target.value);
  };

  return (

    <div className="shadow-sm bg-white">
      <Container className="d-flex justify-content-between align-items-center">
        <Navbar expand="lg">
          <Navbar.Brand href="/">Hexlet Chat</Navbar.Brand>
          {/* <OverlayTrigger
            placement="right"
            delay={{ show: 150, hide: 250 }}
            overlay={renderTooltip}
        >
            <Form.Select size="sm">
              <option onClick={() => changeLanguage('en')}>English</option>
              <option onClick={() => changeLanguage('ru')}>Русский</option>
            </Form.Select>
          </OverlayTrigger> */}
          <Form>
            <Form.Select size="sm" defaultValue={lang} onChange={changeLanguage}>
              <option value="en">English</option>
              <option value="ru">Русский</option>
            </Form.Select>
          </Form>

        </Navbar>

        <AuthButton />

      </Container>
    </div>

  );
};

export default Header;
