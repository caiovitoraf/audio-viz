import React, { useState } from 'react';
import { useAudioEngine } from './hooks/useAudioEngine';
import VisualizerRenderer from './components/VisualizerRenderer';
import * as barsDrawer from './drawers/bars.js';
import * as waveDrawer from './drawers/wave.js';
import * as circleDrawer from './drawers/circle.js';
import './App.css';

const drawers = [barsDrawer, waveDrawer, circleDrawer];

function App() {
  const { audioData, isCapturing, startAudioCapture, stopAudioCapture } = useAudioEngine();
  const [activeDrawer, setActiveDrawer] = useState(drawers[0]);
  const [showUI, setShowUI] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => {
        setIsFullscreen(true);
      });
    } else {
      document.exitFullscreen().then(() => {
        setIsFullscreen(false);
      });
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="logo">AudioViz</h1>
      </header>

      {isCapturing && showUI && (
        <div className="drawer-selector">
          {drawers.map((drawer, index) => (
            <button key={index} onClick={() => setActiveDrawer(drawer)} disabled={drawer === activeDrawer}>
              {drawer.config.name}
            </button>
          ))}
        </div>
      )}

      <main>
        {!isCapturing ? (
          <div className="start-screen">
            <p>Select your tab to start the audio visualization</p>
            <button onClick={startAudioCapture}>Start Capture</button>
            <p className="low-opacity-text">Works better on Chrome</p>
          </div>
        ) : (
          <VisualizerRenderer audioData={audioData} drawer={activeDrawer} />
        )}
      </main>

      {isCapturing && (
        <div className="control-buttons">
          <button onClick={toggleFullscreen}>
            {isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
          </button>
          <button onClick={() => setShowUI(!showUI)} className={!showUI ? 'unobtrusive-button' : ''}>
            {showUI ? 'Hide UI' : 'Show UI'}
          </button>
          {showUI && (
            <button onClick={stopAudioCapture}>Stop Capture</button>
          )}
        </div>
      )}
    </div>
  );
}

export default App;