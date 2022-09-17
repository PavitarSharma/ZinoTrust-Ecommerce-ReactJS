import React from 'react'
import styles from "./Auth.module.scss"
import loginImage from "../../assets/login.png"
import { Link } from 'react-router-dom'
import { FaGoogle } from "react-icons/fa"
import Card from '../../components/Card/Card'

const Login = () => {
    return (
        <section className={`container ${styles.auth}`}>
            <div className={styles.img}>
                <img src={loginImage} alt="login" width="400" />
            </div>
            <Card>
                <div className={styles.form}>
                    <h2>Login</h2>

                    <form>
                        <input
                            type="text"
                            placeholder="Email"
                            required
                            autoComplete='off'
                        />

                        <input
                            type="password"
                            placeholder="Password"
                            required
                            autoComplete='off'
                        />
                        <button className="--btn --btn-primary --btn-block">Login</button>

                        <div className={styles.links}>
                            <Link to="/reset">Reset Password</Link>
                        </div>

                        <p> &#8212;&#8212; or &#8212;&#8212; </p>
                    </form>


                    <button className="--btn --btn-danger --btn-block">
                        <FaGoogle color="#fff" style={{ margin: "0 8px" }} /> Login With Google
                    </button>

                    <span className={styles.register}>
                        <p>Don&apos;t have an account?</p>
                        <Link to="/register" style={{ margin: "0 8px", color: "orangered", fontSize: "16px" }}>Register</Link>
                    </span>
                </div>
            </Card>
        </section>
    )
}

export default Login