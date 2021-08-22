import styles from "./styles.module.scss";

export function Footer() {
    return (
        <footer className={styles.footerContainer}>
            <img src="./logo.svg" className={styles.logo}/>
            <h3 className={styles.logoName}>eureka labs © 2021</h3>
        </footer>
    )
};