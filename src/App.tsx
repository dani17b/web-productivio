// @ts-ignore
import './app.scss';
import React from 'react';
import { Login } from './modules/login/Login';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import { Home } from './modules/home/Home';
import { Admin } from './modules/admin/Admin';
import { PrivateRoute } from './components/privateRoute/PrivateRoute';
import { Badge, SearchBox } from 'lib-productivio';

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
    restrictedTo: ['admin2'],
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
                <Badge label="Hola soy un badge" showAny={true} />
                <SearchBox />
              </PrivateRoute>
            }
          />
        ))}
      </Routes>
    </Router>
  );
}

export default App;
