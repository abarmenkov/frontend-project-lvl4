import React from 'react';
import ReactDOM from 'react-dom/client';
import { io } from 'socket.io-client';
import initApp from './init.jsx';

const app = async () => {
  const socket = io();
  const root = ReactDOM.createRoot(document.getElementById('root'));
  const vdom = await initApp(socket);
  root.render(
    <React.StrictMode>
      {vdom}
    </React.StrictMode>,
  );
};
app();
