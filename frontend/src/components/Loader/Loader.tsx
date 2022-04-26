import LoaderLogo from "./loader.svg"
import styles from "./Loader.module.css"

export const Loader = () => {
  return (
    <div className={styles.loader}>
      <img src={LoaderLogo} />
    </div>
  )
}
