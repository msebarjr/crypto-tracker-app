import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import Signup from "./pages/Signup";

function App() {
    return (
        <div className="app_container">
            <Navbar />
            {/* <Login /> */}
            <Signup />
        </div>
    );
}

export default App;
