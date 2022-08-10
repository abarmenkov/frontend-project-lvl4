import {
  Button, Card, Container, FloatingLabel, Stack, Form,
} from 'react-bootstrap';
import {
  useFormik,
} from 'formik';
import React, { useEffect, useRef, useState } from 'react';
import * as yup from 'yup';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import routes from '../routes.js';
import useAuth from '../hooks/useAuth.jsx';

const SignUp = () => {
  const { t } = useTranslation();
  const [signUpFailed, setSignUpFailed] = useState(false);
  const inputRef = useRef();
  const { logIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const SignupSchema = yup.object({
    username: yup.string()
      .min(3, 'signup.minUsername')
      .max(20, 'signup.maxUsername')
      .required('signup.required'),
    password: yup.string()
      .min(6, 'signup.minPassword')
      .required('signup.required'),
    confirmPassword: yup.string()
      .required('signup.required')
      .oneOf([yup.ref('password')], 'signup.samePassword'),
  });

  const f = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: SignupSchema,
    onSubmit: async (values) => {
      try {
        const response = await axios.post(routes.signupPath(), values);
        localStorage.setItem('user', JSON.stringify(response.data));
        setSignUpFailed(false);
        logIn();
        navigate(routes.homePage());
      } catch (err) {
        if (err.isAxiosError && err.response.status === 409) {
          setSignUpFailed(true);
          inputRef.current.focus();
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
              <h1>{t('signup.title')}</h1>
            </Card.Title>
            <Form
              onSubmit={f.handleSubmit}
              className="d-flex flex-column"
            >
              <FloatingLabel label={t('signup.username')} controlId="username">
                <Form.Control
                  name="username"
                  type="text"
                  placeholder={t('signup.username')}
                  ref={inputRef}
                  value={f.values.username}
                  onChange={f.handleChange}
                  isInvalid={(f.touched.username && !!f.errors.username) || signUpFailed}
                />
                <Form.Control.Feedback type="invalid">
                  {f.errors.username ? t(f.errors.username) : null}
                </Form.Control.Feedback>
              </FloatingLabel>

              <FloatingLabel label={t('signup.password')} controlId="password" className="mt-2">
                <Form.Control
                  name="password"
                  type="password"
                  placeholder={t('signup.password')}
                  value={f.values.password}
                  onChange={f.handleChange}
                  isInvalid={(f.touched.password && !!f.errors.password) || signUpFailed}
                />
                <Form.Control.Feedback type="invalid">
                  {f.errors.password ? t(f.errors.password) : null}
                </Form.Control.Feedback>
              </FloatingLabel>

              <FloatingLabel label={t('signup.confirmPassword')} controlId="confirmPassword" className="mt-2">
                <Form.Control
                  name="confirmPassword"
                  type="password"
                  placeholder={t('signup.confirmPassword')}
                  value={f.values.confirmPassword}
                  onChange={f.handleChange}
                  isInvalid={
                          (f.touched.confirmPassword && !!f.errors.confirmPassword) || signUpFailed
                          }
                />
                <Form.Control.Feedback type="invalid">
                  {f.errors.confirmPassword ? t(f.errors.confirmPassword) : t('signup.signUpFailed')}
                </Form.Control.Feedback>
              </FloatingLabel>
              <Button
                variant="primary"
                type="submit"
                size="lg"
                className="mt-2"
              >
                {t('signup.signUp')}
              </Button>
            </Form>
          </Card.Body>
          <Card.Footer
            className="d-flex align-items-center"
          >
            {t('signup.registered')}
            <Link
              to={routes.loginPage()}
              variant="link"
              className="mx-2 link-primary"
            >
              {t('signup.signin')}
            </Link>
          </Card.Footer>
        </Card>
      </Stack>
    </Container>
  );
};

export default SignUp;
