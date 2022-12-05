import Layout from "../component/layout/Layout";
import "./MainPage.css"
import React from "react";
import ProductListPage from "../productList/productList";

const MainPage = () => {
    return (
        <Layout>
           <ProductListPage></ProductListPage>
        </Layout>
    )
}


export default MainPage;