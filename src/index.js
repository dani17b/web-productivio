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
import { parse } from './utils/parser/tagParser';
import { createFunctionsFromJson } from './utils/parser/parser';

const store = configureAppStore({});

IndexedDB.initialize(apiDefinitionYml);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Provider store={store}>{<App />}</Provider>);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

//console.log(parse('<div> Hola mundo! <b>Estoy en negrita</b> </div>'));
console.log(
  JSON.stringify(
    parse(
      `import React, { useState } from 'react';
    import { Header } from 'src/components/header/Header';
    import { WebNavBar } from 'src/components/webNavBar/WebNavBar';
    import './notFound.scss';
    
    export const NotFound = () => {
    
      return (
        <div className='notFound'>
          <Header></Header>
          <div>
            <h1>404 - Page Not Found</h1>
            <p>Sorry, the page does not exist (by the moment)</p>
          </div>
          <WebNavBar />
        </div>
      );
    };
    `
    )
  )
);
