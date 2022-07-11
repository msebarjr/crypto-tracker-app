import { createContext, useContext, useState } from "react";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

const UserContext = createContext();

export function useUser() {
    return useContext(UserContext);
}

export function UserContextProvider({ children }) {
    const [docRef, setDocRef] = useState("");

    async function addDocument(user, name, email) {
        try {
            const collectionRef = await addDoc(collection(db, "users"), {
                uid: user.uid,
                name: name,
                email: email,
            });
            const id = JSON.stringify(collectionRef.id);
            setDocRef(id);
        } catch (e) {
            console.log("Error Adding Document: ", e);
        }
    }

    async function updateDocument() {
        console.log("Inside update");
        const userRef = doc(db, "users");

        await updateDoc(userRef, {
            name: "Humpty",
        });
    }

    const value = { docRef, addDocument, updateDocument };

    return (
        <UserContext.Provider value={value}>{children}</UserContext.Provider>
    );
}
