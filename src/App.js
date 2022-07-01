import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import Signup from "./pages/Signup";

import { AuthContextProvider } from "./contexts/AuthContext";

function App() {
    return (
        <AuthContextProvider>
            <div className="app_container">
                <Navbar />

                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                </Routes>
            </div>
        </AuthContextProvider>
    );
}

export default App;
