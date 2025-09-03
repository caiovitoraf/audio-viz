export const config = {
    name: "Waveform",
    author: "User",
};

export function draw(context, frequencyData, waveformData, canvasWidth, canvasHeight) {
    context.clearRect(0, 0, canvasWidth, canvasHeight);

    context.lineWidth = 2;
    context.strokeStyle = '#FFA500';

    context.beginPath();

    const sliceWidth = canvasWidth * 1.0 / waveformData.length;
    let x = 0;

    for (let i = 0; i < waveformData.length; i++) {
        const v = waveformData[i] / 128.0;
        const y = v * canvasHeight / 2;

        if (i === 0) {
            context.moveTo(x, y);
        } else {
            context.lineTo(x, y);
        }

        x += sliceWidth;
    }

    context.lineTo(canvasWidth, canvasHeight / 2);
    context.stroke();
}
