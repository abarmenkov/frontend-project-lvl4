import React from 'react';
import MessagesHeader from './messagesHeader.jsx';
import MessagesBody from './MessagesBody.jsx';
import MessagesForm from './MessagesForm.jsx';

const Messages = () => (
  <div className="d-flex flex-column h-100">
    <MessagesHeader />
    <MessagesBody />
    <MessagesForm />
  </div>
);

export default Messages;
