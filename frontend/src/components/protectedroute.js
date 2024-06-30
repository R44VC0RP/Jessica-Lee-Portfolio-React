import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import axios from 'axios';

const ProtectedRoute = ({ component: Component, ...rest }) => {
    const [isAuthenticated, setIsAuthenticated] = React.useState(false);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const checkAuth = async () => {
            try {
                const token = localStorage.getItem('token');
                if (token) {
                    console.log("Checking token")
                    const response = await axios.get('/api/auth/verify', {
                        headers: { 'Authorization': token }
                    });
                    console.log("Response", response)
                    setIsAuthenticated(response.data.isAuthenticated);
                }
            } catch (error) {
                console.log("Error checking token", error)
                setIsAuthenticated(false);
            } finally {
                setLoading(false);
            }
        };
        checkAuth();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <Route
            {...rest}
            render={props =>
                isAuthenticated ? (
                    <Component {...props} />
                ) : (
                    <Redirect to="/login" />
                )
            }
        />
    );
};

export default ProtectedRoute;