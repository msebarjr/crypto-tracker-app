import { createContext, useContext, useState } from "react";
import { collection, getDoc, setDoc, doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase";

const UserContext = createContext({});

export function useUser() {
    return useContext(UserContext);
}

export function UserContextProvider({ children }) {
    const [user, setUser] = useState();

    async function getUser(userUID) {
        const docRef = doc(db, "users", userUID);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            setUser(docSnap.data());
        } else return false;
    }

    function updateUser(userInfo) {
        setUser(userInfo);
    }

    async function addDocument(user, name, email) {
        const colRef = collection(db, "users");
        try {
            await setDoc(doc(colRef, user.uid), {
                uid: user.uid,
                balance: 50000,
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

    async function updateCoinPurchases(userUID, coinToBuy, data) {
        await setDoc(
            doc(db, `users/${userUID}/coinsPurchased`, coinToBuy.id),
            data,
            { merge: true }
        );
    }

    async function updateCoinSelling(userUID, currentCoin, data) {
        await setDoc(
            doc(db, `users/${userUID}/coinsPurchased`, currentCoin.id),
            data
        );
    }

    async function deleteDocument(userUID, currentCoin) {
        await deleteDoc(
            doc(db, `users/${userUID}/coinsPurchased`, currentCoin.id)
        );
    }

    const value = {
        user,
        getUser,
        addDocument,
        updateDocument,
        updateUser,
        updateCoinPurchases,
        updateCoinSelling,
        deleteDocument,
    };

    return (
        <UserContext.Provider value={value}>{children}</UserContext.Provider>
    );
}
