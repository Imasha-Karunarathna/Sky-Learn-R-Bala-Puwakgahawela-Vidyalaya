// src/components/Whiteboard.js
import React, { useRef, useState } from 'react';
import './Whiteboard.css';

const Whiteboard = () => {
    const canvasRef = useRef(null);
    const contextRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [brushColor, setBrushColor] = useState('#000000');
    const [brushSize, setBrushSize] = useState(5);

    const startDrawing = (event) => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        context.strokeStyle = brushColor;
        context.lineWidth = brushSize;
        context.lineCap = 'round';
        context.beginPath();
        context.moveTo(event.nativeEvent.offsetX, event.nativeEvent.offsetY);
        setIsDrawing(true);
        contextRef.current = context;
    };

    const draw = (event) => {
        if (!isDrawing || !contextRef.current) return;

        const context = contextRef.current;
        context.lineTo(event.nativeEvent.offsetX, event.nativeEvent.offsetY);
        context.stroke();
    };

    const stopDrawing = () => {
        if (contextRef.current) {
            contextRef.current.closePath();
        }
        setIsDrawing(false);
    };

    const clearCanvas = () => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);
    };

    const downloadCanvas = () => {
        const canvas = canvasRef.current;
        const image = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = image;
        link.download = 'whiteboard-drawing.png';
        link.click();
    };

    return (
        <div className="whiteboard-container">
            <h2>Interactive Whiteboard</h2>
            <div className="toolbar">
                <input
                    type="color"
                    value={brushColor}
                    onChange={(e) => setBrushColor(e.target.value)}
                    className="color-picker"
                />
                <input
                    type="range"
                    min="1"
                    max="20"
                    value={brushSize}
                    onChange={(e) => setBrushSize(e.target.value)}
                    className="brush-size-slider"
                />
                <button className="clear-btn" onClick={clearCanvas}>Clear</button>
                <button className="download-btn" onClick={downloadCanvas}>Download</button>
            </div>
            <canvas
                ref={canvasRef}
                width="800"
                height="600"
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
            ></canvas>
        </div>
    );
};

export default Whiteboard;
