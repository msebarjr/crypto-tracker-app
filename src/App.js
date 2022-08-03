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

import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";

function App() {
    const [coins, setCoins] = useState([]);
    const [isSignedIn, setIsSignedIn] = useState();

    const effectRan = useRef(false);

    useEffect(() => {
        if (effectRan.current === false) {
            axios.get(process.env.REACT_APP_COIN_API_KEY).then((response) => {
                setCoins(response.data);
            });
        }

        onAuthStateChanged(auth, (user) => {
            if (user) {
                setIsSignedIn(true);
            } else {
                setIsSignedIn(false);
            }
        });

        return () => {
            effectRan.current = true;
        };
    }, [isSignedIn]);

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
                                    !isSignedIn ? (
                                        <Login />
                                    ) : (
                                        <Navigate to="/coins" />
                                    )
                                }
                            />

                            <Route exact path="/" element={<Login />} />
                            <Route exact path="/signup" element={<Signup />} />

                            <Route
                                exact
                                path="/coins"
                                element={
                                    <ProtectedRoute isSignedIn={isSignedIn}>
                                        <Coins />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                exact
                                path="/portfolio"
                                element={
                                    <ProtectedRoute isSignedIn={isSignedIn}>
                                        <Portfolio coins={coins} />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="/coin/:coinId"
                                element={
                                    <ProtectedRoute isSignedIn={isSignedIn}>
                                        <CoinPage coins={coins} />
                                    </ProtectedRoute>
                                }
                            >
                                <Route path=":coinId" />
                            </Route>
                            <Route path="*" element={<Navigate to="/" />} />
                        </Routes>
                    </div>
                </UserContextProvider>
            </AuthContextProvider>
            <ToastContainer position="top-right" theme="colored" />
        </>
    );
}

export default App;
