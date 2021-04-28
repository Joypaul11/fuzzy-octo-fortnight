import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import { AuthProvider } from './contexts/AuthContext';

import Login from './components/Login';
import Profile from './components/Profile';
import PrivateRoute from './components/PrivateRoute';
import OrderList from './components/OrderList';
import Order from './components/Order';

function App() {
  return (
    
        <Router>
          <AuthProvider>
            <Switch>
              <PrivateRoute exact path='/' component={Profile}/>
              <PrivateRoute exact path='/orders' component={OrderList}/>
              <PrivateRoute path='/orders/:orderid' component={Order}/>
              <Route path='/login' component={Login}/>
            </Switch>
          </AuthProvider>
        </Router>
  );
}

export default App;
