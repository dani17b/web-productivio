// @ts-ignore
import './app.scss';
import 'lib-productivio/dist/cjs/index.css';
import React from 'react';
import { Login } from './modules/login/Login';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import { Home } from './modules/home/Home';
import { Admin } from './modules/admin/Admin';
import { PrivateRoute } from './components/privateRoute/PrivateRoute';
import { NewTask } from './modules/newTask/NewTask';
import { UserConfig } from './modules/userConfig/UserConfig';

const ROUTES = [
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/home',
    element: <Home />,
    restrictedTo: ['any'],
  },
  {
    path: '/admin',
    element: <Admin />,
    //restrictedTo: ['admin2'],
  },
  {
    path: '/form',
    element: <NewTask />,
  },
  {
    path: '/config',
    element: <UserConfig/>,
  },
];

function App() {
  return (
    <Router>
      <Routes>
        {ROUTES.map((ROUTE, i) => (
          <Route
            key={i}
            path={ROUTE.path}
            element={
              <PrivateRoute roles={ROUTE.restrictedTo} key={i}>
                {ROUTE.element}
              </PrivateRoute>
            }
          />
        ))}
      </Routes>
    </Router>
  );
}

export default App;
