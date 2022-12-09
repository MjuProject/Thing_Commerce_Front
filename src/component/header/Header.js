import "./Header.css"
import Category from "../../categorySearch/category";
import CategoryPage from "../../categorySearch/category";

const Header = () => {
    return(
        <header>
            <div>
                <div>
                    <h2>logo</h2>
                </div>
                <div>
                    <h2>searchbar</h2>
                </div>
                <div>
                    <h2>alarm</h2>
                </div>
                <div>
                    <CategoryPage></CategoryPage>
                </div>
            </div>
        </header>
    )
}

export default Header