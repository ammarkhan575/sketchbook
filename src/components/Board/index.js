import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

const Board = () => {
    const canvasRef = useRef(null);
    const shouldDraw = useRef(false);
    const activeMenuItem = useSelector((state) => state.menu.activeMenuItem);
    const { color, size } = useSelector((state) => state.toolbox[activeMenuItem]);

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