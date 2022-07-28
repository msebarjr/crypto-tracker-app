import { useEffect, useState, useRef } from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { AuthContextProvider, useAuth } from "./contexts/AuthContext";
import { UserContextProvider } from "./contexts/UserContext";

import CoinPage from "./pages/CoinPage";
import Coins from "./pages/Coins";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import Portfolio from "./pages/Portfolio";
import ProtectedRoute from "./components/ProtectedRoute";
import Signup from "./pages/Signup";

function App() {
    const [coins, setCoins] = useState([]);
    const { currentUser } = useAuth();

    const effectRan = useRef(false);

    useEffect(() => {
        if (effectRan.current === false) {
            axios.get(process.env.REACT_APP_COIN_API_KEY).then((response) => {
                setCoins(response.data);
            });
        }

        return () => {
            effectRan.current = true;
        };
    }, []);

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
                                    currentUser && currentUser ? (
                                        <Coins coins={coins} />
                                    ) : (
                                        <Login />
                                    )
                                }
                            />
                            <Route exact path="/login" element={<Login />} />
                            <Route exact path="/signup" element={<Signup />} />

                            <Route
                                exact
                                path="/coins"
                                element={
                                    <ProtectedRoute>
                                        <Coins coins={coins} />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                exact
                                path="/portfolio"
                                element={
                                    <ProtectedRoute>
                                        <Portfolio coins={coins} />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="/coin/:coinId"
                                element={
                                    <ProtectedRoute>
                                        <CoinPage coins={coins} />
                                    </ProtectedRoute>
                                }
                            >
                                <Route path=":coinId" />
                            </Route>
                        </Routes>
                    </div>
                </UserContextProvider>
            </AuthContextProvider>
            <ToastContainer position="top-right" theme="colored" />
        </>
    );
}

export default App;
