import "./App.css";
import NavigationBar from "./component/navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home.jsx";
import ManageData from "./pages/manage-data.jsx";

function App() {
    return (
        <>
            <BrowserRouter>
                <NavigationBar />

                <Routes>
                    <Route path="/" element={<Home />} />
                </Routes>
                
                <Routes>
                    <Route path="/manage-data" element={<ManageData />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
