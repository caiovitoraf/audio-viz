export const getRainbowGradient = (context, canvasWidth, canvasHeight, frequencyData) => {
    const gradient = context.createLinearGradient(0, 0, canvasWidth, 0); // Horizontal gradient

    // Define rainbow colors
    const colors = [
        { stop: 0, color: '#FF0000' }, // Red
        { stop: 0.16, color: '#FF7F00' }, // Orange
        { stop: 0.33, color: '#FFFF00' }, // Yellow
        { stop: 0.50, color: '#00FF00' }, // Green
        { stop: 0.66, color: '#0000FF' }, // Blue
        { stop: 0.83, color: '#4B0082' }, // Indigo
        { stop: 1, color: '#9400D3' }  // Violet
    ];

    colors.forEach(({ stop, color }) => {
        gradient.addColorStop(stop, color);
    });

    return gradient;
};

export const getOrangeColor = () => {
    return '#FFA500'; // Solid orange
};

export const getWhiteColor = () => {
    return '#FFFFFF'; // Solid white
};