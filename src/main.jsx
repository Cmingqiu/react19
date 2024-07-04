import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { App as AntdApp } from 'antd';

createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <AntdApp>
    <App />
  </AntdApp>
  // </React.StrictMode>
);
