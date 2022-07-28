import { useEffect, useState, useRef } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { AuthContextProvider } from "./contexts/AuthContext";
import { UserContextProvider } from "./contexts/UserContext";

import CoinPage from "./pages/CoinPage";
import Coins from "./pages/Coins";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import Portfolio from "./pages/Portfolio";
import ProtectedRoute from "./components/ProtectedRoute";
import Signup from "./pages/Signup";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

function App() {
    const [coins, setCoins] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const effectRan = useRef(false);

    useEffect(() => {
        if (effectRan.current === false) {
            axios.get(process.env.REACT_APP_COIN_API_KEY).then((response) => {
                setCoins(response.data);
            });
        }
        
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setIsLoggedIn(user ? true : false);
        });

        return () => {
            effectRan.current = true;
            unsubscribe();
        };
    }, [isLoggedIn]);

    return (
        <>
            <AuthContextProvider>
                <UserContextProvider>
                    <div className="app_container">
                        <Navbar />
                        <Routes>
                            <Route
                                exact
                                path="/"
                                element={
                                    isLoggedIn ? (
                                        <Navigate to="/coins" coins={coins} />
                                    ) : (
                                        <Login />
                                    )
                                }
                            />

                            <Route path="/login" element={<Login />} />
                            <Route exact path="/signup" element={<Signup />} />

                            <Route
                                exact
                                path="/coins"
                                element={
                                    <ProtectedRoute loggedIn={isLoggedIn}>
                                        <Coins coins={coins} />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                exact
                                path="/portfolio"
                                element={
                                    <ProtectedRoute loggedIn={isLoggedIn}>
                                        <Portfolio coins={coins} />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="/coin/:coinId"
                                element={
                                    <ProtectedRoute>
                                        <CoinPage />
                                    </ProtectedRoute>
                                }
                            >
                                <Route path=":coinId" />
                            </Route>
                        </Routes>
                    </div>
                </UserContextProvider>
            </AuthContextProvider>
            <ToastContainer position="top-right" theme="colored" pauseOnHover />
        </>
    );
}

export default App;
