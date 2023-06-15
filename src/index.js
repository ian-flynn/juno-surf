import React from 'react';
import { render } from 'react-dom';
import App from './components/App.jsx';
import styles from './styles/styles.scss';
import * as ReactDOMClient from 'react-dom/client';

const container = document.getElementById('root');
const root = ReactDOMClient.createRoot(container);
root.render(<App />);
