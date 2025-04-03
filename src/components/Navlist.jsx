import { NavLink } from "react-router-dom"
import { useSelector } from "react-redux"

const links = [
    { id: 1, url: "", text: "Home" },
    { id: 2, url: "products", text: "Product" },
    { id: 3, url: "order", text: "Order" },
    { id: 4, url: "checkout", text: "Checkout" },
]


const Navlist = () => {
    const { user } = useSelector(state => state.userState)
    return (
        <>
            {links.map((link) => {
                const { id, url, text } = link
                if ((url == "order" || url == "checkout") && !user) {
                    return null
                }
                return (
                    <li key={id}>
                        <NavLink to={url}>{text}</NavLink>
                    </li>
                )
            })}
        </>
    )
}

export default Navlist