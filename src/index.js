// @ts-nocheck
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import configureAppStore from './redux/configureStore';
import 'lib-productivio/dist/cjs/index.css';
import { IndexedDB } from './lib/axios/indexeddb/IndexedDB';
import apiDefinitionYml from './config/api.json';
import { reactToJson, parseCode } from './utils/parser/parser';

const store = configureAppStore({});

IndexedDB.initialize(apiDefinitionYml);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    {/* <App /> */}
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();


const react = `import React from 'react'

export const Prueba = () => {
  return (
    <div>"Hola mundo!"</div>
  )
}`;

console.log(reactToJson(react));
console.log(parseCode(react));