import React, { useRef, useEffect } from 'react';

const VisualizerRenderer = ({ audioData, drawer }) => {
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
                drawer.draw(context, frequencyData, waveformData, canvas.width, canvas.height);
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