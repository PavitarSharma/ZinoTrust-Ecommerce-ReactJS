import styles from "./Header.module.scss"
import { Link, NavLink, useNavigate } from "react-router-dom"
import { FaShoppingCart, FaTimes, FaUserCircle } from "react-icons/fa"
import { HiOutlineMenuAlt3 } from "react-icons/hi"
import { useState, useEffect } from "react"
import { signOut, onAuthStateChanged } from "firebase/auth"
import { auth } from "../../firebase/config"
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useDispatch } from "react-redux"
import { SET_ACTIVE_USER, REMOVE_ACTIVE_USER } from "../../redux/slice/authSlice"
import ShowOnLogin, { ShowOnLogout } from "../HiddenLinks/HiddenLink"




const Logo = () => {
    return (
        <div className={styles.logo}>
            <Link to="/">
                <h2>
                    e<span>Shop&#8226;</span>
                </h2>
            </Link>
        </div>
    )
}

const cart = (
    <span className={styles.cart}>
        <Link to="/cart">
            Cart<FaShoppingCart size={20} />
            <p>0</p>
        </Link>
    </span>
)

const activeLink = ({ isActive }) => (isActive ? `${styles.active}` : "")

const Header = () => {
    const navigate = useNavigate()
    const [userName, setUserName] = useState("")
    const [showMenu, setShowMenu] = useState(false)
    const dispatch = useDispatch()


    // monitor currently signedIn user
    useEffect(() => {

        onAuthStateChanged(auth, (user) => {
            if (user) {
                const uid = user.uid;

                if (user.displayName === null) {
                    const u1 = user.email.substring(0, user.email.indexOf("@"))
                    const uname = u1.charAt(0).toUpperCase() + u1.slice(1)
                    setUserName(uname)
                } else {
                    setUserName(user.displayName)
                }

                dispatch(SET_ACTIVE_USER({
                    email: user.email,
                    userName: user.displayName ? user.displayName : userName,
                    userID: uid
                }))
            } else {
                dispatch(REMOVE_ACTIVE_USER())
                setUserName("")
            }
        });


    }, [dispatch, userName])


    const toggleMenu = () => setShowMenu(!showMenu)

    const hideMenu = () => setShowMenu(false)

    const logoutUser = () => {
        signOut(auth).then(() => {
            toast.success("Logout Successfully")
            dispatch(REMOVE_ACTIVE_USER())
            navigate("/")
        }).catch((error) => {
            toast.error(error.message)
        })
    }

    return (
        <>
            <ToastContainer />
            <header>
                <div className={styles.header}>
                    <Logo />

                    <nav className={showMenu ? `${styles["show-nav"]}` : `${styles["hide-nav"]}`}>
                        <div
                            onClick={hideMenu}
                            className={showMenu ? `${styles["nav-wrapper"]} ${styles["show-nav-wrapper"]}` : `${styles["nav-wrapper"]}`}>

                        </div>

                        <ul onClick={hideMenu}>
                            <li className={styles["logo-mobile"]}>
                                <Logo />
                                <FaTimes size={22} color="#fff" onClick={hideMenu} />
                            </li>
                            <li>
                                <ShowOnLogin>
                                    <NavLink to="/" className={activeLink}>Home</NavLink>
                                </ShowOnLogin>
                            </li>
                            <li>
                                <ShowOnLogin>
                                    <NavLink to="/contact" className={activeLink}>Contact Us</NavLink>
                                </ShowOnLogin>

                            </li>
                        </ul>

                        <div onClick={hideMenu} className={styles["header-right"]}>
                            <span className={styles.links}>
                                <ShowOnLogout>
                                    <NavLink className={activeLink} to="/login">Login</NavLink>
                                    <NavLink className={activeLink} to="/register">Register</NavLink>
                                </ShowOnLogout>

                                <ShowOnLogin>
                                    <a href="!#" style={{ color: "#ff7722"}}>
                                        <FaUserCircle size={16} />
                                        Hi, {userName}
                                    </a>
                                    <NavLink className={activeLink} to="/order-history">My Orders</NavLink>
                                    <NavLink className={activeLink} to="/" onClick={logoutUser}>Logout</NavLink>
                                </ShowOnLogin>

                            </span>

                            {cart}
                        </div>

                    </nav>

                    <div className={styles["menu-icon"]}>
                        {cart}
                        <HiOutlineMenuAlt3 size={28} onClick={toggleMenu} />
                    </div>
                </div>
            </header>
        </>
    )
}

export default Header