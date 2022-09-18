import { useState } from 'react'
import styles from "./Auth.module.scss"
import registerImage from "../../assets/register.png"
import { Link, useNavigate } from 'react-router-dom'
import { FaGoogle } from "react-icons/fa"
import Card from '../../components/Card/Card'
import { createUserWithEmailAndPassword  } from "firebase/auth"
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { auth } from "../../firebase/config"
import Loader from '../../components/Loader/Loader'


const Register = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [cPassword, setCPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const register = (event) => {
        event.preventDefault()
        if (!validationInput()) return

        setLoading(true)

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // eslint-disable-next-line
                const user = userCredential.user
                setLoading(false)
                toast.success("Registration Successfully Done")
                navigate("/login")
            })
            .catch((error) => {
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
        } else if (cPassword === "") {
            toast.error("Confirmed password required")
        } else if (cPassword.length < 6) {
            toast.error("Confirm password length greater than 6")
        } else if (password !== cPassword) {
            toast.error("Password do not match.")
        } else {
            return true
        }

    }

    return (
        <>
            <ToastContainer />
            {loading && <Loader />}
            <section className={`container ${styles.auth}`}>

                <Card>
                    <div className={styles.form}>
                        <h2>Register</h2>

                        <form onSubmit={register}>

                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                            />

                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                            />
                            <input
                                type="password"
                                placeholder="Confirm Password"
                                value={cPassword}
                                onChange={(event) => setCPassword(event.target.value)}
                            />
                            <button className="--btn --btn-primary --btn-block">Register</button>
                        </form>


                        <button className="--btn --btn-danger --btn-block">
                            <FaGoogle color="#fff" style={{ margin: "0 8px" }} /> Register With Google
                        </button>

                        <span className={styles.register}>
                            <p>Already have an account?</p>
                            <Link to="/login" style={{ margin: "0 8px", color: "orangered", fontSize: "16px" }}>Login</Link>
                        </span>
                    </div>
                </Card>

                <div className={styles.img}>
                    <img src={registerImage} alt="register" width="400" />
                </div>
            </section>
        </>
    )
}

export default Register