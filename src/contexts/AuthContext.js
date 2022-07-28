import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase";

import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
} from "firebase/auth";

const AuthContext = createContext({});

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthContextProvider({ children }) {
    const [currentUser, setCurrentUser] = useState({});

    function signup(email, password) {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    function logout() {
        return signOut(auth);
    }

    function login(email, password) {
        return signInWithEmailAndPassword(auth, email, password);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
        });

        return () => {
            unsubscribe();
        };
    }, []);

    const value = {
        currentUser,
        signup,
        login,
        logout,
    };

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
}
