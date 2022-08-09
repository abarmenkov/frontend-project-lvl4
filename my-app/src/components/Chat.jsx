import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  Container,
  Row,
  Col,
} from 'react-bootstrap';
import fetchData from '../api/fetchData.js';
import useAuth from '../hooks/useAuth.jsx';
import Channels from './Channels.jsx';
import Messages from './messages/Messages.jsx';

const Chat = () => {
  const dispatch = useDispatch();
  const { getAuthHeader } = useAuth();
  const authHeader = getAuthHeader();
  useEffect(() => {
    dispatch(fetchData(authHeader));
  }, [dispatch, authHeader]);

  return (
    <Container className="h-100 my-4 overflow-hidden rounded shadow">
      <Row className="h-100 bg-white">
        <Col className="border-end pt-5 px-0 bg-light" xs={4} md={2}>
          <Channels />
        </Col>
        <Col className="h-100 p-0">
          <Messages />
        </Col>
      </Row>
    </Container>
  );
};

export default Chat;
