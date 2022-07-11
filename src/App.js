import { Routes, Route, Navigate } from "react-router-dom";
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

function App() {
    return (
        <>
            <AuthContextProvider>
                <UserContextProvider>
                    <div className="app_container">
                        <Navbar />
                        <Routes>
                            <Route
                                path="/"
                                element={<Navigate to="/login" />}
                            />
                            <Route path="/login" element={<Login />} />
                            <Route path="/signup" element={<Signup />} />
                            <Route
                                path="/coins"
                                element={
                                    <ProtectedRoute>
                                        <Coins />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="/portfolio"
                                element={
                                    <ProtectedRoute>
                                        <Portfolio />
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
