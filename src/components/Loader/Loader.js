import styles from "./Loader.module.scss"
import loaderImage from "../../assets/loader.gif"
import ReactDom from "react-dom"

const Loader = () => {
    return ReactDom.createPortal(
        <div className={styles.wrapper}>
            <div className={styles.loader}>
                <img src={loaderImage} alt="Loading..." />
            </div>
        </div>,
        document.getElementById("loader")
    )
}

export default Loader