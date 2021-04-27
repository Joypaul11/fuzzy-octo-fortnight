import React, { useContext, useState, useEffect } from 'react';
import { auth, db } from '../firebase';

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({children}) {
    const [loading, setLoading] = useState(true);
    const [currentUser, setCurrentUser] = useState();

    async function login(email, password) {
        return await auth.signInWithEmailAndPassword(email, password);
    }

    function logout() {
        return auth.signOut()
    }

    async function getUserDetails() {
        const user = await db.collection('users').doc(currentUser.uid).get();
        if (user) return user.data();
        else return null;
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user);
            setLoading(false);
        })
        return unsubscribe;
    }, [])

    const value = {
        login,
        currentUser,
        logout,
        getUserDetails
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}