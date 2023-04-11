import { render, screen, act } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureAppStore from 'src/redux/configureStore';
import { UserConfig } from './UserConfig';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';

const store = configureAppStore({});

test('renders learn react link', () => {
  render(
    <Provider store={store}>
      <Router>
        <Routes>
          <Route element={<UserConfig />} path="/"/>
        </Routes>
      </Router>
    </Provider>
  );

  const userConfigHeader = screen.getByTestId('userConfig-header');
  expect(userConfigHeader).toBeInTheDocument();

  const userConfigContainer = screen.getByTestId('userConfig-container');
  expect(userConfigContainer).toBeInTheDocument();

  
});
