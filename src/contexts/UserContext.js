import { createContext, useContext, useState } from "react";
import { collection, getDoc, setDoc, doc } from "firebase/firestore";
import { db } from "../firebase";

const UserContext = createContext();

export function useUser() {
    return useContext(UserContext);
}

export function UserContextProvider({ children }) {
    const [user, setUser] = useState({});

    async function getUser(userUID) {
        const docRef = doc(db, "users", userUID);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            setUser(docSnap.data());
        } else console.log("No document");
    }

    async function addDocument(user, name, email) {
        const userRef = collection(db, "users");

        try {
            await setDoc(doc(userRef, user.uid), {
                uid: user.uid,
                name: name,
                email: email,
                coinsWatching: [],
                coinsOwn: [],
            });
        } catch (e) {
            console.log("Error Adding Document: ", e);
        }
    }

    async function updateDocument(userUID, data) {
        const docRef = doc(db, "users", userUID);

        try {
            await setDoc(docRef, data, { merge: true });
        } catch (e) {
            console.log(e);
        }
    }

    const value = { getUser, addDocument, user, updateDocument };

    return (
        <UserContext.Provider value={value}>{children}</UserContext.Provider>
    );
}
