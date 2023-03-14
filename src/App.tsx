// @ts-ignore
import './App.css';
//import { Login } from './modules/login/Login';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import { Home } from './modules/home/Home';
import { Admin } from './modules/admin/Admin';
import { PrivateRoute } from './components/privateRoute/PrivateRoute';
import { TeamDropdown } from './components/teamDropdown/TeamDropdown';

const teamData = [
  { name: 'John', age: 25, role: 'Developer' },
  { name: 'Alice', age: 30, role: 'Designer' },
  { name: 'Bob', age: 35, role: 'Manager' },
];

const ROUTES = [
  {
    path: '/login',
    element: <TeamDropdown title="DropDown1" data={teamData} />,
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
              </PrivateRoute>
            }
          />
        ))}
      </Routes>
    </Router>
  );
}

export default App;
