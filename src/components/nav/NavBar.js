import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"

export const NavBar = () => {

    const navigate = useNavigate()

    return (
        <ul className="navBar">
            <li>
                <Link className="navbar__link" to="" onClick={() => {
                    navigate('/')
                }}> Home</Link>
            </li>
            <li>
                <Link className="navbar__link" to="/locations">
                    Locations</Link>
            </li>
            <li>
                <Link className="navbar__link" to="/products">
                    Products</Link>
            </li>

            <li className="navbar__item navbar__logout">
                <Link className="navbar__link" to="" onClick={() => {
                    localStorage.removeItem("kandy_user")
                    navigate("/", { replace: true })
                }}>Logout</Link>
            </li>
        </ul>
    )
}
