import React from 'react';
import ReactDOM from 'react-dom/client';
import initApp from './init.jsx';

const app = async () => {
  const root = ReactDOM.createRoot(document.getElementById('root'));
  const vdom = await initApp();
  root.render(
    <React.StrictMode>
      {vdom}
    </React.StrictMode>,
  );
};
app();
