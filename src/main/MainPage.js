import Layout from "../component/layout/Layout";
import "./MainPage.css"
import React from "react";
import {shallowEqual, useSelector} from "react-redux";
import ProductListPage from "../productList/productList";
import CategorySearchPage from "../categorySearch/categorySearch";
const MainPage = () => {
    const value = useSelector(state => state.value, shallowEqual)
    return (
        <Layout>
            {JSON.stringify(value) === JSON.stringify([])?
                <ProductListPage></ProductListPage>
                :

                <CategorySearchPage></CategorySearchPage>

            }
        </Layout>
    )
}


export default MainPage;