// @ts-ignore
import './app.scss';
import React from 'react';

import { Login } from './modules/login/Login';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import { Home } from './modules/home/Home';
import { Admin } from './modules/admin/Admin';
import { PrivateRoute } from './components/privateRoute/PrivateRoute';
import { UserProfile } from './modules/userProfile/UserProfile';
import { NewTask } from './modules/newTask/NewTask';
import { UserConfig } from './modules/userConfig/UserConfig';
import { Ranking } from './modules/ranking/Ranking';
import { Circle } from './modules/circle/Circle';
import { NotFound } from './modules/notFound/NotFound';
import { EditTaskPage } from './modules/editTaskPage/EditTaskPage';

import { NewTeam } from './modules/newTeam/NewTeam';
import { Editor } from './modules/editor/Editor';

const ROUTES = [
  {
    path: '/',
    element: <Editor />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/',
    element: <Home />,
    // restrictedTo: ['any'],
  },
  {
    path: '/admin',
    element: <Admin />,
    restrictedTo: ['admin'],
  },
  { path: '/circle', element: <Circle /> },
  {
    path: '/user',
    element: <UserProfile />,
  },
  {
    path: '/config',
    element: <UserConfig />,
  },
  {
    path: '/ranking',
    element: <Ranking />,
  },
  {
    path: '/*',
    element: <NotFound />,
  },
  {
    path: '/edit',
    element: <EditTaskPage />,
  },
  {
    path: '/team',
    element: <NewTeam />,
  },
  {
    path: '/newtask',
    element: <NewTask />,
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
