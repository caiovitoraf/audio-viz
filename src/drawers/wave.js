

export const config = {
    name: "Waveform",
    author: "User",
};

/**
 * Draws a waveform based on audio time-domain data.
 * @param {CanvasRenderingContext2D} context - The 2D context of the canvas.
 * @param {Uint8Array} frequencyData - Array of audio frequency data (not used in this drawer).
 * @param {Uint8Array} waveformData - Array of audio waveform data.
 * @param {number} canvasWidth - The width of the canvas.
 * @param {number} canvasHeight - The height of the canvas.
 */
export function draw(context, frequencyData, waveformData, canvasWidth, canvasHeight) {
    context.clearRect(0, 0, canvasWidth, canvasHeight);

    context.lineWidth = 2;
    context.strokeStyle = '#00FFFF';

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
