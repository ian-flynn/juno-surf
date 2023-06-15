import React from 'react';
import App from './components/App.jsx';
import './styles.scss';
import * as ReactDOMClient from 'react-dom/client';

const container = document.getElementById('root');
const root = ReactDOMClient.createRoot(container);
root.render(<App />);
