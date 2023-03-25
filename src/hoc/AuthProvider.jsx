import React from "react";
import { createContext } from "react";

export const AuthContext = createContext(null);

export default function AuthProvider({ children, setUser, setLoading, token }) {

    const [userToken, setUserToken] = React.useState(token);

    React.useEffect(() => {
        async function getDateUser() {
            if (token) {
                setLoading(true);
                let response = await fetch('https://sf-final-project-be.herokuapp.com/api/auth/', {
                    headers: {
                        AUTHORIZATION: `Bearer ${token}`
                    }
                })
                let result = await response.json();
                if (result.status === 'OK') {
                    const { user } = result.data;
                    setUser(user);
                } else {
                    localStorage.clear();
                    setUserToken(null);
                }
                setLoading(false);
            }
        }
        getDateUser();
    }, [])

    const signin = (userDate, cb) => {
        fetch('https://sf-final-project-be.herokuapp.com/api/auth/sign_in', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(userDate)
        })
            .then(response => response.json())
            .then(result => {
                if (result.status === 'OK') {
                    const { user } = result.data;
                    const { token } = result.data;
                    localStorage.setItem('token', token);
                    setUser(user);
                    setUserToken(token);
                    cb();
                } else {
                    alert(result.message);
                }
            })
    }

    const signout = (cb) => {
        setUser({});
        setUserToken(null);
        localStorage.clear();
        cb();
    }

    const value = { userToken, signin, signout }

    return <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
}