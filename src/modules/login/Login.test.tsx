import { render, screen, act } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureAppStore from 'src/redux/configureStore';
import { Login } from './Login';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';

const store = configureAppStore({});

test('renders learn react link', () => {
  render(
    <Provider store={store}>
      <Router>
        <Routes>
          <Route element={<Login />} path="/"/>
        </Routes>
      </Router>
    </Provider>
  );

  const loginForm = screen.getByTestId('login-form');
  expect(loginForm).toBeInTheDocument();

  // Act es necesario para ejecutar bloques que impliquen lanzamiento de hooks
  act(() => {
    const loginSubmit = screen.getByTestId('login-submit');
    expect(loginSubmit).toBeInTheDocument();
    //loginSubmit.click();
  });
});
