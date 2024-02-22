import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil, faEraser, faRotateLeft, faRotateRight, faFileArrowDown } from "@fortawesome/free-solid-svg-icons";
import styles from './index.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { MENU_ITEMS } from '@/constants';
import { menuItemClick, actionItemClick } from '@/slice/menuSlice';
import cx from 'classnames';

const Menu = () => {
    const dispatch = useDispatch();
    const activeMenuItem = useSelector((state) => state.menu.activeMenuItem);
    const handleMenuClick = (option) => {
        dispatch(menuItemClick(option));
    }
    const handleActionItemClick = (option) =>{
        dispatch(actionItemClick(option));
    }
    return (
        <div className={styles.menuContainer}>
            <div className={cx(styles.menuItem, { [styles.active]: activeMenuItem === MENU_ITEMS.PENCIL })} onClick={() => handleMenuClick(MENU_ITEMS.PENCIL)}>
                <FontAwesomeIcon icon={faPencil} />
            </div>
            <div className={cx(styles.menuItem, { [styles.active]: activeMenuItem === MENU_ITEMS.ERASER })} onClick={() => handleMenuClick(MENU_ITEMS.ERASER)}>
                <FontAwesomeIcon icon={faEraser} />
            </div>
            <div className={styles.menuItem} onClick={()=> handleActionItemClick(MENU_ITEMS.UNDO)}>
                <FontAwesomeIcon icon={faRotateLeft} />
            </div>
            <div className={styles.menuItem} onClick={()=> handleActionItemClick(MENU_ITEMS.REDO)}>
                <FontAwesomeIcon icon={faRotateRight} />
            </div>
            <div className={styles.menuItem} onClick={()=> handleActionItemClick(MENU_ITEMS.DOWNLOAD)}>
                <FontAwesomeIcon icon={faFileArrowDown} />
            </div>
        </div >
    )
}

export default Menu;