export const config = {
    name: "Vertical Bars",
    author: "User",
};

export function draw(context, frequencyData, waveformData, canvasWidth, canvasHeight) {
    context.clearRect(0, 0, canvasWidth, canvasHeight);

    const barWidth = (canvasWidth / frequencyData.length) * 2.5;
    let barHeight;
    let x = 0;

    context.fillStyle = '#FFA500';

    for (let i = 0; i < frequencyData.length; i++) {
        barHeight = frequencyData[i];

        context.fillRect(x, canvasHeight - barHeight / 2, barWidth, barHeight / 2);

        x += barWidth + 1;
    }
}