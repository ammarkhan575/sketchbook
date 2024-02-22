import { MENU_ITEMS } from "@/constants";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { menuItemClick, actionItemClick } from '@/slice/menuSlice';

const Board = () => {
    const dispatch = useDispatch();
    const canvasRef = useRef(null);
    const shouldDraw = useRef(false);
    const drawHistory = useRef([]);
    const historyPointer = useRef(null);
    const { activeMenuItem, actionMenuItem } = useSelector((state) => state.menu);
    const { color, size } = useSelector((state) => state.toolbox[activeMenuItem]);

    useEffect(() => {
        if (!canvasRef.current) return;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (actionMenuItem === MENU_ITEMS.DOWNLOAD) {
            const URL = canvas.toDataURL();
            const anchor = document.createElement('a');
            anchor.href = URL;
            anchor.download = 'sketch.jpg';
            anchor.click();
        }
        else if (actionMenuItem === MENU_ITEMS.UNDO || actionMenuItem === MENU_ITEMS.REDO) {
            if (historyPointer.current > 0 && actionMenuItem === MENU_ITEMS.UNDO) historyPointer.current -= 1;
            if (historyPointer.current < drawHistory.current.length-1 && actionMenuItem === MENU_ITEMS.REDO) historyPointer.current += 1;
            const imageData = drawHistory.current[historyPointer.current];
            ctx.putImageData(imageData, 0, 0);

        }
        dispatch(actionItemClick(null));
    }, [actionMenuItem, dispatch])
    useEffect(() => {
        if (!canvasRef.current) return;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const changeConfig = () => {
            ctx.strokeStyle = color;
            ctx.lineWidth = size;
        }
        const beginPath = (x, y) => {
            ctx.beginPath();
            ctx.moveTo(x, y);
        }
        const drawLine = (x, y) => {
            ctx.lineTo(x, y);
            ctx.stroke();
        }
        const handleMouseDown = (e) => {
            shouldDraw.current = true;
            const x = e.clientX;
            const y = e.clientY;
            beginPath(x, y);
        }
        const handleMouseMove = (e) => {
            if (!shouldDraw.current) return;
            const x = e.clientX;
            const y = e.clientY;
            drawLine(x, y);
        }
        const handleMouseUp = (e) => {
            shouldDraw.current = false;
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            drawHistory.push(imageData);
            historyPointer.current = drawHistory.current.length - 1;
        }
        canvas.addEventListener('mousedown', handleMouseDown);
        canvas.addEventListener('mousemove', handleMouseMove);
        canvas.addEventListener('mouseup', handleMouseUp);

        changeConfig();

        return () => {
            canvas.removeEventListener('mousedown', handleMouseDown);
            canvas.removeEventListener('mousemove', handleMouseMove);
            canvas.removeEventListener('mouseup', handleMouseUp);
        }
    }, [color, size])

    useEffect(() => {
        if (!canvasRef.current) return;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }, []);

    return (
        <canvas ref={canvasRef}>
        </canvas>
    )
}
export default Board;