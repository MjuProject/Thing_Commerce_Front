import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "../main/MainPage"
import Login from "../login/Login"
import SignUp from "../signUp/SignUp"
import Test from "../test/test"

function Routers() {
    return(
        <div>
        <BrowserRouter>
            <Routes>
                <Route path = "/*" element = {<Test/>} />
                <Route path = "/signUp" element = {<SignUp/>} />
                <Route path = "/main" element = {<MainPage/>} />
                <Route path = "/login" element = {<Login/>} />
            </Routes>
        </BrowserRouter>
        </div>
    )
}
export default Routers;