import { useState } from 'react'
import styles from "./Auth.module.scss"
import loginImage from "../../assets/login.png"
import { Link, useNavigate } from 'react-router-dom'
import { FaGoogle } from "react-icons/fa"
import Card from '../../components/Card/Card'
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth"
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { auth } from "../../firebase/config"
import Loader from '../../components/Loader/Loader'

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const login = (event) => {
        event.preventDefault()
        if (!validationInput()) return

        setLoading(true)

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // eslint-disable-next-line
                const user = userCredential.user
                setLoading(false)
                toast.success("Login Successfully Done")
                navigate("/")
            })
            .catch((error) => {
                setLoading(false)
                toast.error(error.message)
            })
    }

    const signInWithGoogle = (event) => {
        const provider = new GoogleAuthProvider()
        signInWithPopup(auth, provider)
            .then((result) => {
                // eslint-disable-next-line
                const user = result.user;
                setLoading(false)
                toast.success("Login Successfully Done")
                navigate("/")

            }).catch((error) => {
                setLoading(false)
                toast.error(error.message)
            })
    }

    const validationInput = () => {
        if (email === "") {
            toast.error("Email is required!")
        } else if (password === "") {
            toast.error("Password is required!")
        } else if (password.length < 6) {
            toast.error("Password length greater than 6")
        } else {
            return true
        }

    }


    return (
        <>
            <ToastContainer />
            {loading && <Loader />}
            <section className={`container ${styles.auth}`}>
                <div className={styles.img}>
                    <img src={loginImage} alt="login" width="400" />
                </div>
                <Card>
                    <div className={styles.form}>
                        <h2>Login</h2>

                        <form onSubmit={login}>
                            <input
                                type="text"
                                placeholder="Email"
                                required
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                            />

                            <input
                                type="password"
                                placeholder="Password"
                                required
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                            />
                            <button className="--btn --btn-primary --btn-block">Login</button>

                            <div className={styles.links}>
                                <Link to="/reset">Reset Password</Link>
                            </div>

                            <p> &#8212;&#8212; or &#8212;&#8212; </p>
                        </form>


                        <button className="--btn --btn-danger --btn-block" onClick={signInWithGoogle}>
                            <FaGoogle color="#fff" style={{ margin: "0 8px" }} /> Login With Google
                        </button>

                        <span className={styles.register}>
                            <p>Don&apos;t have an account?</p>
                            <Link to="/register" style={{ margin: "0 8px", color: "orangered", fontSize: "16px" }}>Register</Link>
                        </span>
                    </div>
                </Card>
            </section>
        </>
    )
}

export default Login