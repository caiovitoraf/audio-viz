import React, { useRef, useEffect } from 'react';
import { getRainbowGradient, getOrangeColor, getWhiteColor } from '../utils/colorPalettes'; // New import

const VisualizerRenderer = ({ audioData, drawer, activeColorPalette }) => { // Added activeColorPalette
    const canvasRef = useRef(null);
    useEffect(() => {
        const canvas = canvasRef.current;
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
        return () => window.removeEventListener('resize', resizeCanvas);
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        const { frequencyData, waveformData } = audioData;

        let animationFrameId;

        const render = () => {
            if (drawer && frequencyData && waveformData) {
                let fillColor;
                if (activeColorPalette === 'rainbow') {
                    fillColor = getRainbowGradient(context, canvas.width, canvas.height, frequencyData);
                } else if (activeColorPalette === 'orange') {
                    fillColor = getOrangeColor();
                } else if (activeColorPalette === 'white') {
                    fillColor = getWhiteColor();
                }

                drawer.draw(context, frequencyData, waveformData, canvas.width, canvas.height, fillColor); // Added fillColor
            }
            animationFrameId = requestAnimationFrame(render);
        };

        render();

        return () => {
            cancelAnimationFrame(animationFrameId);
        };
    }, [audioData, drawer]);

    return <canvas ref={canvasRef} />;
};

export default VisualizerRenderer;