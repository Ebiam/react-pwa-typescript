import { BrowserRouter, Route, Routes } from 'react-router-dom';
import User from "../pages/User";
import Login from "../pages/Login";
import Home from "../pages/Home";
import React from "react";

export default function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route  path="/" element={<Home/>}/>
                <Route  path="/user" element={<User/>}/>
                <Route path="/login" element={<Login/>}/>
            </Routes>
        </BrowserRouter>
    );
}
