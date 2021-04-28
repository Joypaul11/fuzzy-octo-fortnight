import { act, render, screen } from '@testing-library/react';
import App from './App';
import OrderList from './components/OrderList';
import PrivateRoute from './components/PrivateRoute';

describe('App', () => {
  test('renders OrderList component', () => {
    render(<OrderList />);
    screen.debug()
  });
});