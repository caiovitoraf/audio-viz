export const config = {
    name: "Circles",
    author: "User",
};

export function draw(context, frequencyData, waveformData, canvasWidth, canvasHeight) {
    context.clearRect(0, 0, canvasWidth, canvasHeight);
    const centerX = canvasWidth / 2;
    const centerY = canvasHeight / 2;

    for (let i = 0; i < frequencyData.length; i++) {
        const value = frequencyData[i];
        const radius = value / 2;

        if (radius > 0) {
            context.beginPath();
            const x = centerX + (Math.cos(i * 2 * Math.PI / frequencyData.length) * (radius + 50));
            const y = centerY + (Math.sin(i * 2 * Math.PI / frequencyData.length) * (radius + 50));
            context.arc(x, y, radius / 4, 0, 2 * Math.PI, false);

            const hue = i / frequencyData.length * 360;
            context.fillStyle = `hsl(${hue}, 100%, 50%)`;
            context.fill();
        }
    }
}
