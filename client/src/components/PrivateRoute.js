import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

import AppNavbar from './Navbar';

export default function PrivateRoute({component: Component, ...rest}) {
    const { currentUser } = useAuth();
    console.log(currentUser);
    return (
        <Route 
            {...rest}
            render={props => {
                return currentUser ? 
                    <>
                        <AppNavbar/>
                        <Component {...props} />
                    </>
                     : 
                    <Redirect to="/login" />
            }}
        ></Route>
    )
}