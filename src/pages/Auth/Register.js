import React from 'react'
import styles from "./Auth.module.scss"
import registerImage from "../../assets/register.png"
import { Link } from 'react-router-dom'
import { FaGoogle } from "react-icons/fa"
import Card from '../../components/Card/Card'

const Register = () => {
    return (
        <section className={`container ${styles.auth}`}>

            <Card>
                <div className={styles.form}>
                    <h2>Register</h2>

                    <form>
                        <input
                            type="text"
                            placeholder="Username"
                            required
                            autoComplete='off'
                        />
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
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            required
                            autoComplete='off'
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
    )
}

export default Register