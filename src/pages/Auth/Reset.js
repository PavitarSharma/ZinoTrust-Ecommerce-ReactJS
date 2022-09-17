import React from 'react'
import styles from "./Auth.module.scss"
import resetImage from "../../assets/forgot.png"
import { Link } from 'react-router-dom'
import Card from '../../components/Card/Card'
import { FaArrowRight, FaArrowLeft } from "react-icons/fa"

const Reset = () => {
  return (
    <section className={`container ${styles.auth}`}>
      <div className={styles.img}>
        <img src={resetImage} alt="reset" width="400" />
      </div>
      <Card>
        <div className={styles.form}>
          <h2>Reset Password</h2>

          <form>
            <input
              type="text"
              placeholder="Email"
              required
              autoComplete='off'
            />
            <button className="--btn --btn-primary --btn-block">Reset Password</button>
            <div className={styles.links}>
              <p>
                <Link to="/login" style={{ display: "flex", alignItems: "center", gap: "4px" }}><FaArrowLeft size={12} color="#908e8e" />Login</Link>
              </p>
              <p>
                <Link to="/register" style={{ display: "flex", alignItems: "center", gap: "4px" }}>Register <FaArrowRight size={12} color="#908e8e" /></Link>
              </p>

            </div>
          </form>


        </div>
      </Card>
    </section>
  )
}

export default Reset