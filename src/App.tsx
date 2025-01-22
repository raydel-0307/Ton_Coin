import React, { useEffect } from 'react';
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Friends from "./pages/Friends";
import Earn from "./pages/Earn";
import PreLoad from "./pages/PreLoad";
import Ruleta from "./pages/Ruleta";

const App: React.FC = () => {

    useEffect(() => {
        const script = document.createElement('script');
        script.src = "https://telegram.org/js/telegram-web-app.js?56";
        script.async = true;
        document.body.appendChild(script);
      }, []);

    return (
        <div className="p-6">
            <Routes>
                <Route index element={<PreLoad />} />
                <Route path="/home" element={<Home />} />
                <Route path="/friends" element={<Friends />} />
                <Route path="/earn" element={<Earn />} />
                <Route path="/ruleta" element={<Ruleta />} />
            </Routes>
            
        </div>
    );
};

export default App;
