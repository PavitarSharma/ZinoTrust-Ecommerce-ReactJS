import { useState } from 'react'
import styles from "./Auth.module.scss"
import resetImage from "../../assets/forgot.png"
import { Link } from 'react-router-dom'
import Card from '../../components/Card/Card'
import { sendPasswordResetEmail } from "firebase/auth"
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { auth } from "../../firebase/config"
import Loader from '../../components/Loader/Loader'
import { FaArrowRight, FaArrowLeft } from "react-icons/fa"

const Reset = () => {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)

  const resetPassword = (event) => {
    event.preventDefault()

    sendPasswordResetEmail(auth, email)
      .then(() => {
        toast.success("Check your email for a reset link")
        setLoading(false)
      })
      .catch((error) => {
        setLoading(false)
        toast.error("Email not found with this account")
      });

  }

  return (
    <>
      <ToastContainer />
      {loading && <Loader />}
      <section className={`container ${styles.auth}`}>
        <div className={styles.img}>
          <img src={resetImage} alt="reset" width="400" />
        </div>
        <Card>
          <div className={styles.form}>
            <h2>Reset Password</h2>

            <form onSubmit={resetPassword}>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
              <button type="submit" className="--btn --btn-primary --btn-block">Reset Password</button>
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
    </>
  )
}

export default Reset