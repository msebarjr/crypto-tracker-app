import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";

import Coins from "./pages/Coins";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
// import ProtectedRoute from "./components/ProtectedRoute";
import Signup from "./pages/Signup";

import { AuthContextProvider } from "./contexts/AuthContext";

function App() {
    const [top100Coins, setTop100Coins] = useState([]);
    const url =
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=true";

    useEffect(() => {
        axios.get(url).then((response) => {
            setTop100Coins(response.data);
            console.log(response.data);
        });
    }, [url]);

    return (
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
                            <Coins coins={top100Coins} />
                        }
                    />
                </Routes>
            </div>
        </AuthContextProvider>
    );
}

export default App;
