import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const Logout = () => {
    const history = useHistory();

    useEffect(() => {
        localStorage.removeItem('token');
        window.location.href = '/login';
    }, [history]);

    return null;
};

export default Logout;