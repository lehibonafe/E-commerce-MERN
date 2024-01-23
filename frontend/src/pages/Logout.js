import { Navigate } from 'react-router-dom';
import UserContext from '../UserContext';
import {useContext, useEffect } from 'react';

export default function Logout() {

	const { unsetUser, setUser} = useContext(UserContext);
    console.log('Successfully logged out!');
    // localStorage.clear();
    unsetUser(); // to clear local storage

    useEffect(()=>{ // to set user state access field to null 
    	setUser({id: null, isAdmin: null});
    })

    // Redirect back to login
    return (

        <Navigate to='/b4/login' />
    )
}

