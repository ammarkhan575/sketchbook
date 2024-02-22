import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil, faEraser, faRotateLeft, faRotateRight, faFileArrowDown } from "@fortawesome/free-solid-svg-icons";
import styles from './index.module.css';

const Menu = () => {
    return (
        <div className={styles.menuContainer}>
            <div className={styles.menuItem}>
                <FontAwesomeIcon icon={faPencil} />
            </div>
            <div className={styles.menuItem}>
                <FontAwesomeIcon icon={faEraser} />
            </div>
            <div className={styles.menuItem}>
                <FontAwesomeIcon icon={faRotateLeft} />
            </div>
            <div className={styles.menuItem}>
                <FontAwesomeIcon icon={faRotateRight} />
            </div>
            <div className={styles.menuItem}>
                <FontAwesomeIcon icon={faFileArrowDown} />
            </div>
        </div>
    )
}

export default Menu;