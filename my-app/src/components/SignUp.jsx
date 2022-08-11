import {
  Button, Card, Container, FloatingLabel, Col, Form, Row, Image,
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
import avatar from '../images/avatar_1.jpg';

const SignUp = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'signup' });
  const [signUpFailed, setSignUpFailed] = useState(false);
  const inputRef = useRef();
  const { logIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const SignupSchema = yup.object({
    username: yup.string()
      .min(3, 'minUsername')
      .max(20, 'maxUsername')
      .required('required'),
    password: yup.string()
      .min(6, 'minPassword')
      .required('required'),
    confirmPassword: yup.string()
      .required('required')
      .oneOf([yup.ref('password')], 'samePassword'),
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
    <Container fluid className="h-100">
      <Row className="justify-content-center align-content-center h-100">
        <Col className="col-12" md={8} xxl={6}>
          <Card className="shadow-sm">
            <Card.Body className="row p-5">
              <Col className="col-12 d-flex align-items-center justify-content-center" md={6}>
                <Image
                  src={avatar}
                  className="rounded-circle"
                  alt={t('title')}
                />
              </Col>
              <Form onSubmit={f.handleSubmit} className="col-12 col-md-6 mt-3 mt-mb-0">
                <h1 className="text-center mb-3">{t('title')}</h1>
                <FloatingLabel label={t('username')} controlId="username" className="mt-2">
                  <Form.Control
                    name="username"
                    type="text"
                    placeholder={t('username')}
                    ref={inputRef}
                    value={f.values.username}
                    onChange={f.handleChange}
                    isInvalid={(f.touched.username && !!f.errors.username) || signUpFailed}
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
                    isInvalid={(f.touched.password && !!f.errors.password) || signUpFailed}
                  />
                  <Form.Control.Feedback type="invalid">
                    {f.errors.password ? t(f.errors.password) : null}
                  </Form.Control.Feedback>
                </FloatingLabel>

                <FloatingLabel label={t('confirmPassword')} controlId="confirmPassword" className="mt-2">
                  <Form.Control
                    name="confirmPassword"
                    type="password"
                    placeholder={t('confirmPassword')}
                    value={f.values.confirmPassword}
                    onChange={f.handleChange}
                    isInvalid={
                      (f.touched.confirmPassword && !!f.errors.confirmPassword) || signUpFailed
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    {f.errors.confirmPassword ? t(f.errors.confirmPassword) : t('signUpFailed')}
                  </Form.Control.Feedback>
                </FloatingLabel>
                <Button
                  variant="primary"
                  type="submit"
                  size="lg"
                  className="w-100 mt-2"
                >
                  {t('signUp')}
                </Button>
              </Form>
            </Card.Body>
            <Card.Footer
              className="p-4"
            >
              <div className="text-center">
                <span>{t('registered')}</span>
                <Link
                  to={routes.loginPage()}
                  variant="link"
                  className="mx-2 link-primary"
                >
                  {t('signin')}
                </Link>
              </div>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SignUp;
