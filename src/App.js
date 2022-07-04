import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Coins from "./pages/Coins";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
// import ProtectedRoute from "./components/ProtectedRoute";
import Signup from "./pages/Signup";

import { AuthContextProvider } from "./contexts/AuthContext";
import CoinPage from "./components/Coins/CoinPage";

function App() {
    return (
        <>
            <AuthContextProvider>
                <div className="app_container">
                    <Navbar />
                    <Routes>
                        <Route path="/" element={<Login />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route
                            path="/coins"
                            element={
                                // <ProtectedRoute>
                                //     <Coins />
                                // </ProtectedRoute>
                                <Coins />
                            }
                        />
                        <Route path="/coin/:coinId" element={<CoinPage />}>
                            <Route path=":coinId" />
                        </Route>
                    </Routes>
                </div>
            </AuthContextProvider>
            <ToastContainer position="top-right" theme="colored" pauseOnHover />
        </>
    );
}

export default App;
