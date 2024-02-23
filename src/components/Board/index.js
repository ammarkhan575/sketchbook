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
            if (historyPointer.current < drawHistory.current.length - 1 && actionMenuItem === MENU_ITEMS.REDO) historyPointer.current += 1;
            const imageData = drawHistory.current[historyPointer.current];
            console.log(imageData);
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
            ctx.fillStyle = color; // Set fill color for rectangles
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
        const drawRect = (x1, y1, x2, y2) => {
            // ctx.fillRect(Math.min(x1, x2), Math.min(y1, y2), Math.abs(x2 - x1), Math.abs(y2 - y1));
            ctx.strokeRect(Math.min(x1, x2), Math.min(y1, y2), Math.abs(x2 - x1), Math.abs(y2 - y1));
        }
        const drawCircle = (x1, y1, x2, y2) => {
            const radius = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
            ctx.beginPath();
            ctx.arc(x1, y1, radius, 0, 2 * Math.PI);
            ctx.stroke();
        }
        const handleMouseDown = (e) => {
            shouldDraw.current = true;
            const startX = e.clientX;
            const startY = e.clientY;
            if (activeMenuItem === MENU_ITEMS.RECTANGLE) {
                // Store the initial coordinates of the rectangle
                shouldDraw.current = { startX, startY };
            }
            else if (activeMenuItem === MENU_ITEMS.PENCIL) {
                beginPath(startX, startY);
                console.log('pencil mouse down');
            }
            else if (activeMenuItem === MENU_ITEMS.CIRCLE) {
                shouldDraw.current = { startX, startY };
            }
            else if(activeMenuItem === MENU_ITEMS.LINE){
                shouldDraw.current = {startX, startY};
                beginPath(startX,startY);
            }
        }
        const handleMouseMove = (e) => {
            if (!shouldDraw.current) return;
            const x = e.clientX;
            const y = e.clientY;
            if (activeMenuItem === MENU_ITEMS.PENCIL) drawLine(x, y);
            else if (activeMenuItem === MENU_ITEMS.ERASER) drawLine(x, y);
        }
        const handleMouseUp = (e) => {

            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            drawHistory.current.push(imageData);
            historyPointer.current = drawHistory.current.length - 1;
            if (activeMenuItem === MENU_ITEMS.RECTANGLE) {
                const x = e.clientX;
                const y = e.clientY;
                const { startX, startY } = shouldDraw.current;
                drawRect(startX, startY, x, y);
                console.log('rectangle mouse move');
                console.log(x, y);
            }
            else if (activeMenuItem === MENU_ITEMS.CIRCLE) {
                const x = e.clientX;
                const y = e.clientY;
                const { startX, startY } = shouldDraw.current;
                drawCircle(startX, startY, x, y);
            }
            else if(activeMenuItem === MENU_ITEMS.LINE){
                const x = e.clientX;
                const y = e.clientY;
                drawLine(x,y);
            }
            shouldDraw.current = false;
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
    }, [color, size, activeMenuItem])

    useEffect(() => {
        if (!canvasRef.current) return;
        const canvas = canvasRef.current;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }, []);

    return (
        <canvas ref={canvasRef}>
        </canvas>
    )
}
export default Board;
