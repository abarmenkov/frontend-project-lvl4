import React, { useEffect, useRef, useState } from 'react';
import {
  Button,
  Card, Container, Stack, Form, FloatingLabel,
} from 'react-bootstrap';
import * as yup from 'yup';
import { useFormik } from 'formik';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import useAuth from '../hooks/useAuth.jsx';
import routes from '../routes.js';

const LoginPage = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'login' });
  const auth = useAuth();
  const [authFailed, setAuthFailed] = useState(false);
  const inputRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    inputRef.current.focus();
  }, [inputRef]);

  const SignupSchema = yup.object({
    username: yup.string()
      .required('required'),
    password: yup.string()
      .required('required'),
  });

  const f = useFormik({
    initialValues: { username: '', password: '' },
    validationSchema: SignupSchema,
    onSubmit: async (values) => {
      setAuthFailed(false);
      try {
        const res = await axios.post(routes.loginPath(), values);
        localStorage.setItem('user', JSON.stringify(res.data));
        auth.logIn();
        navigate(routes.homePage());
      } catch (err) {
        if (err.isAxiosError && err.response.status === 401) {
          setAuthFailed(true);
          inputRef.current.select();
          return;
        }
        throw err;
      }
    },
  });

  return (
    <Container className="h-100 d-flex">
      <Stack className="justify-content-center align-self-center">
        <Card>
          <Card.Body>
            <Card.Title>
              <h1>{t('title')}</h1>
            </Card.Title>
            <Form onSubmit={f.handleSubmit} className="d-flex flex-column">
              <FloatingLabel label={t('username')} controlId="username">
                <Form.Control
                  name="username"
                  type="text"
                  placeholder={t('username')}
                  ref={inputRef}
                  value={f.values.username}
                  onChange={f.handleChange}
                  isInvalid={(f.touched.username && !!f.errors.username) || authFailed}
                />
                <Form.Control.Feedback type="invalid">
                  {f.errors.username ? t(f.errors.username) : null}
                </Form.Control.Feedback>
              </FloatingLabel>
              <FloatingLabel label={t('password')} controlId="password" className="mt-2">
                <Form.Control
                  name="password"
                  type="password"
                  placeholder={t('password')}
                  value={f.values.password}
                  onChange={f.handleChange}
                  isInvalid={(f.touched.password && !!f.errors.password) || authFailed}
                />
                <Form.Control.Feedback type="invalid">
                  {f.errors.password ? t(f.errors.password) : t('autFailed')}
                </Form.Control.Feedback>
              </FloatingLabel>
              <Button variant="primary" type="submit" size="lg" className="mt-2">
                {t('logIn')}
              </Button>
            </Form>
          </Card.Body>
          <Card.Footer className="d-flex align-items-center">
            {t('notRegistered')}
            <Link to={routes.signUpPage()} variant="link" className="mx-2 link-primary">
              {t('registration')}
            </Link>
          </Card.Footer>
        </Card>
      </Stack>
    </Container>
  );
};

export default LoginPage;
