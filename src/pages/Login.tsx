import MenuNavbar from "../components/material/MenuNavbar";
import LoginForm from "../components/material/LoginForm";
import React from "react";

export default function Login() {

    return (
        <div className={"Page-content"}>
            <MenuNavbar/>
            <div className="center">
                <LoginForm/>
            </div>
        </div>
    );
};
