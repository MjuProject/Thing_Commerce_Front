import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "../main/MainPage"
import Login from "../login/Login"
import SignUp from "../signUp/SignUp"
import Test from "../test/test"
import Category from "../categorySearch/category";
import ProductViewDetails from "../productViewDetails/productViewDetails";

function Routers() {
    return(
        <div>
        <BrowserRouter>
            <Routes>
                <Route path = "/*" element = {<MainPage/>} />
                <Route path = "/signUp" element = {<SignUp/>} />
                <Route path = "/login" element = {<Login/>} />
                <Route path = "/category" element = {<Category/>}/>
                <Route path = "/productViewDetails" element = {<ProductViewDetails/>}/>
            </Routes>
        </BrowserRouter>
        </div>
    )
}
export default Routers;