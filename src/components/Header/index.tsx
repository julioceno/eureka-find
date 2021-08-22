import styles from "./styles.module.scss";

export function Header() {
    return (
        <header className={styles.headerContainer}>
            <img src="./logo.svg" className={styles.logo}/>
            <h1 className={styles.logoName}>Eureka <strong> Find </strong> </h1>
        </header>
    )
};