import React, { useState, useEffect } from 'react';
import Login from '../pages/Login';

function LoginContainer({ login , onLogin  }) {

    const [loginStatus, setLoginStatus] = useState(false);

    useEffect(() => {
        console.log("inside login", login);
    }, [login]);

    
    useEffect(() => {
        console.log("loginStatus loginStatus", loginStatus);
    }, [loginStatus]);

    return (
        <div>
            {/* <Login
                login={login}
                onLogin={onLogin}
                
                
            /> */}
        </div>
    );
}

export default LoginContainer;
