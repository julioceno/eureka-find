import styles from "./styles.module.scss";

type PopupProps = {
    togglePopup: () => void;
    message: string;
}

export function Popup({ togglePopup, message }: PopupProps) {
  
    return (
        <div className={styles.containerModal}>
            <main className={styles.popup}>
                <header className={styles.animateAppear}>
                    <h3>Alerta importante</h3>
                    <button onClick={togglePopup}>
                        <img src="/minimize.svg" alt="Minimizar"/>
                    </button>
                </header>

                <p>{message}</p>
            </main>
        </div>
    )
};