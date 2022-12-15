import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "../main/MainPage"
import Login from "../login/Login"
import SignUp from "../signUp/SignUp"
import Write from "../write/Write"
import MyPage from "../myPage/MyPage"
import SearchPage from "../search/search"
import Category from "../categorySearch/category";
import ProductViewDetails from "../productViewDetails/productViewDetails";

function Routers() {
    return(
        <div>
        <BrowserRouter>
            <Routes>
                <Route path = "/*" element = {<MainPage/>} />
                <Route path = "/search" element = {<SearchPage/>} />
                <Route path = "/signUp" element = {<SignUp/>} />
                <Route path = "/login" element = {<Login/>} />
                <Route path = "/category" element = {<Category/>}/>
                <Route path = "/productViewDetails" element = {<ProductViewDetails/>}/>
                <Route path = "/write" element = {<Write/>}/>
                <Route path = "/myPage" element = {<MyPage/>}/>
            </Routes>
        </BrowserRouter>
        </div>
    )
}
export default Routers;
