import Header from "../header/Header"
import Footer from "../footer/Footer"
import "./Layout.css"

const Layout = (props) => {
    return (
        <div className = "basicLayout">
            <Header />
            <main className="mainLayout">
                {props.children}
            </main>
            <Footer />
        </div>
    )
}
export default Layout