# AudioViz

AudioViz is a web application that provides a simple collection of real-time audio visualizers. Its modular and extensible architecture allows new visualization styles to be added as independent "plugins" without altering the core of the application.

## Live Demo

Test the application at the following link: [https://audio-viz-lake.vercel.app/](https://audio-viz-lake.vercel.app/)

## How it works

The application is divided into three main logical layers:

1.  **The Audio Engine (`AudioEngine`)**: Manages the entire audio lifecycle, including capturing audio, creating and managing the `AudioContext` and `AnalyserNode`, and running the main animation loop.
2.  **The Renderer (`VisualizerRenderer.jsx`)**: Manages the `<canvas>` element and orchestrates the drawing, calling the drawing function of the active visualizer module in each frame of the loop.
3.  **The Visualization Modules ("Drawers")**: Contain the drawing logic for a single visual style, each exporting a `draw` function that follows a predefined contract.

## Tech Stack, Libraries, and Modules

*   **React**: for building the user interface.
*   **Vite**: for the development and build environment.
*   **ESLint**: for code linting.
*   **`getDisplayMedia`**: for audio capture.
*   **`AudioContext`** and **`AnalyserNode`**: for audio analysis.
*   **`requestAnimationFrame`**: for smooth and efficient animations.

## How to Run the Project Locally

1.  Clone the repository:
    ```bash
    git clone https://github.com/caiovitoraf/audioviz.git
    ```
2.  Install the dependencies:
    ```bash
    npm install
    ```
3.  Run the development server:
    ```bash
    npm run dev
    ```