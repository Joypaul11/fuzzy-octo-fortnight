import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Container } from 'react-bootstrap';

import AppNavbar from './Navbar';

export default function PrivateRoute({component: Component, ...rest}) {
    const { currentUser } = useAuth();
    return (
        <Route 
            {...rest}
            render={props => {
                return currentUser ? 
                    <>
                        <AppNavbar/>
                        <Container className="d-flex justify-content-center" style={{ minHeight: "100vh" }}>
                            <div className="w-100">
                                <Component {...props} />
                            </div>
                        </Container>
                    </>
                     : 
                    <Redirect to="/login" />
            }}
        ></Route>
    )
}