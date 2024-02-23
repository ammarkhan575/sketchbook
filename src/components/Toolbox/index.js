import { useSelector, useDispatch } from 'react-redux';
import styles from './index.module.css';
import cx from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { COLORS, MENU_ITEMS } from '@/constants';
import { changeBrushSize, changeColor } from '@/slice/toolboxSlice';

const Toolbox = () => {
    const activeMenuItem = useSelector((state) => state.menu.activeMenuItem);
    const dispatch = useDispatch();
    const showStrokeToolOption = (activeMenuItem === MENU_ITEMS.PENCIL) || (activeMenuItem === MENU_ITEMS.RECTANGLE) || (activeMenuItem === MENU_ITEMS.CIRCLE) || (activeMenuItem === MENU_ITEMS.LINE);
    const showBrushToolOption = (activeMenuItem === MENU_ITEMS.PENCIL) || (activeMenuItem === MENU_ITEMS.ERASER) || (activeMenuItem === MENU_ITEMS.RECTANGLE) || (activeMenuItem === MENU_ITEMS.CIRCLE) || (activeMenuItem === MENU_ITEMS.LINE);
    const { color, size } = useSelector((state) => state.toolbox[activeMenuItem])

    const updateBrushSize = (e) => {
        dispatch(changeBrushSize({ item: activeMenuItem, size: e.target.value }));
    }

    const updateColor = (newColor) => {
        dispatch(changeColor({ item: activeMenuItem, color: newColor }));
    }

    return (
        <div className={styles.toolContainer}>
            {showStrokeToolOption &&
                <div className={styles.toolItem}>
                    <h4 className={styles.toolText}>Stroke Color</h4>
                    <div className={styles.itemContainer}>

                        <div className={cx(styles.colorBox, { [styles.active]: color === COLORS.BLACK })} style={{ backgroundColor: COLORS.BLACK }} onClick={() => updateColor(COLORS.BLACK)} >
                            {
                                color === COLORS.BLACK &&
                                <FontAwesomeIcon icon={faArrowDown} width={5} height={5} style={{ position: 'absolute', top: '-14px', left: '5px' }} />
                            }
                        </div>

                        <div className={cx(styles.colorBox, { [styles.active]: color === COLORS.WHITE })} style={{ backgroundColor: COLORS.WHITE }} onClick={() => updateColor(COLORS.WHITE)} >
                            {
                                color === COLORS.WHITE &&
                                <FontAwesomeIcon icon={faArrowDown} width={5} height={5} style={{ position: 'absolute', top: '-14px', left: '5px' }} />
                            }
                        </div>

                        <div className={cx(styles.colorBox, { [styles.active]: color === COLORS.GREEN })} style={{ backgroundColor: COLORS.GREEN }} onClick={() => updateColor(COLORS.GREEN)}>
                            {
                                color === COLORS.GREEN &&
                                <FontAwesomeIcon icon={faArrowDown} width={5} height={5} style={{ position: 'absolute', top: '-14px', left: '5px' }} />
                            }
                        </div>
                        <div className={cx(styles.colorBox, { [styles.active]: color === COLORS.RED })} style={{ backgroundColor: COLORS.RED }} onClick={() => updateColor(COLORS.RED)} >
                            {
                                color === COLORS.RED &&
                                <FontAwesomeIcon icon={faArrowDown} width={5} height={5} style={{ position: 'absolute', top: '-14px', left: '5px' }} />
                            }
                        </div>
                        <div className={cx(styles.colorBox, { [styles.active]: color === COLORS.BLUE })} style={{ backgroundColor: COLORS.BLUE }} onClick={() => updateColor(COLORS.BLUE)} >
                            {
                                color === COLORS.BLUE &&
                                <FontAwesomeIcon icon={faArrowDown} width={5} height={5} style={{ position: 'absolute', top: '-14px', left: '5px' }} />
                            }
                        </div>
                        <div className={cx(styles.colorBox, { [styles.active]: color === COLORS.ORANGE })} style={{ backgroundColor: COLORS.ORANGE }} onClick={() => updateColor(COLORS.ORANGE)} >
                            {
                                color === COLORS.ORANGE &&
                                <FontAwesomeIcon icon={faArrowDown} width={5} height={5} style={{ position: 'absolute', top: '-14px', left: '5px' }} />
                            }
                        </div>
                        <div className={cx(styles.colorBox, { [styles.active]: color === COLORS.YELLOW })} style={{ backgroundColor: COLORS.YELLOW }} onClick={() => updateColor(COLORS.YELLOW)} >
                            {
                                color === COLORS.YELLOW &&
                                <FontAwesomeIcon icon={faArrowDown} width={5} height={5} style={{ position: 'absolute', top: '-14px', left: '5px' }} />
                            }
                        </div>
                    </div>
                </div>
            }
            {showBrushToolOption &&
                <div className={styles.toolItem}>
                    <h4 className={styles.toolText}>Brush Size</h4>
                    <div>
                        {
                            showStrokeToolOption ?
                                <input type="range" min={1} max={10} step={1} value={size} name="Brushsize" onChange={updateBrushSize} />
                                :
                                <input type="range" min={1} max={60} step={3} value={size} name="Brushsize" onChange={updateBrushSize} />
                        }

                    </div>
                </div>
            }

        </div>
    )
}

export default Toolbox;