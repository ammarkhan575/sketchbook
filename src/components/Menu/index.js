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
    const handleActionItemClick = (option) => {
        dispatch(actionItemClick(option));
    }
    return (
        <div className={styles.menuContainer}>
            {/* PENCIL */}
            <div className={cx(styles.menuItem, { [styles.active]: activeMenuItem === MENU_ITEMS.PENCIL })} onClick={() => handleMenuClick(MENU_ITEMS.PENCIL)}>
                <FontAwesomeIcon icon={faPencil} />
            </div>
            {/* RECTANGLE */}
            <div className={cx(styles.menuItem, { [styles.active]: activeMenuItem === MENU_ITEMS.RECTANGLE })} onClick={() => handleMenuClick(MENU_ITEMS.RECTANGLE)}>
                <div className='w-5 h-3 bg-white border border-black'></div>
            </div>
            {/* CIRCLE */}
            <div className={cx(styles.menuItem, { [styles.active]: activeMenuItem === MENU_ITEMS.CIRCLE })} onClick={() => handleMenuClick(MENU_ITEMS.CIRCLE)}>
                <div className='w-5 h-5 bg-white border rounded-full border-black'></div>
            </div>
            {/* LINE */}
            <div className={cx(styles.menuItem, { [styles.active]: activeMenuItem === MENU_ITEMS.LINE })} onClick={() => handleMenuClick(MENU_ITEMS.LINE)}>
                <div className='w-5 h-[1px] bg-white border -rotate-45 rounded-full border-black'></div>
            </div>
            {/* ERASER */}
            <div className={cx(styles.menuItem, { [styles.active]: activeMenuItem === MENU_ITEMS.ERASER })} onClick={() => handleMenuClick(MENU_ITEMS.ERASER)}>
                <FontAwesomeIcon icon={faEraser} />
            </div>
            {/* UNDO */}
            <div className={styles.menuItem} onClick={() => handleActionItemClick(MENU_ITEMS.UNDO)}>
                <FontAwesomeIcon icon={faRotateLeft} />
            </div>
            {/* REDO */}
            <div className={styles.menuItem} onClick={() => handleActionItemClick(MENU_ITEMS.REDO)}>
                <FontAwesomeIcon icon={faRotateRight} />
            </div>
            {/* DOWNLOAD */}
            <div className={styles.menuItem} onClick={() => handleActionItemClick(MENU_ITEMS.DOWNLOAD)}>
                <FontAwesomeIcon icon={faFileArrowDown} />
            </div>
        </div >
    )
}

export default Menu;