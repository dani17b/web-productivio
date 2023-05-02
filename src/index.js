import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import configureAppStore from './redux/configureStore';
import 'lib-productivio/dist/cjs/index.css';
import { IndexedDB } from './lib/axios/indexeddb/IndexedDB';
import apiDefinitionYml from './config/api.json';
import { SetJsonStyle } from './utils/SetJsonStyle';
import { parseJsonToTsx } from './utils/parser/JsonToTsx';
import { parseJsonToScss, testJson } from './utils/parser/JsonToScss';

const store = configureAppStore({});

IndexedDB.initialize(apiDefinitionYml);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Provider store={store}>{<App />}</Provider>);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

console.log('setter json', parseJsonToTsx(SetJsonStyle({ color: 'red' })));

console.log('Sass parseado:', parseJsonToScss(testJson));
