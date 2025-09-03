
import { useState, useEffect, useRef, useCallback } from 'react';

export const useAudioEngine = () => {
  const [audioData, setAudioData] = useState({ frequencyData: new Uint8Array(0), waveformData: new Uint8Array(0) });
  const [isCapturing, setIsCapturing] = useState(false);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const sourceRef = useRef(null);
  const animationFrameRef = useRef(null);
  const streamRef = useRef(null);

  const stopAudioCapture = useCallback(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    if (sourceRef.current) {
      sourceRef.current.disconnect();
    }
    if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
    }
    if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
      audioContextRef.current.close();
    }
    setIsCapturing(false);
  }, []);

  const startAudioCapture = async () => {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({ audio: true, video: true });

      // Check if the stream has an audio track
      if (stream.getAudioTracks().length === 0) {
        // Stop the video track to remove the screen sharing indicator
        stream.getVideoTracks().forEach(track => track.stop());
        alert('No audio track found. Please make sure to check the "Share tab audio" or "Share system audio" option when selecting a screen.');
        throw new Error('No audio tracks in MediaStream');
      }

      streamRef.current = stream;
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 2048;

      const source = audioContext.createMediaStreamSource(stream);
      source.connect(analyser);

      audioContextRef.current = audioContext;
      analyserRef.current = analyser;
      sourceRef.current = source;

      const frequencyData = new Uint8Array(analyser.frequencyBinCount);
      const waveformData = new Uint8Array(analyser.frequencyBinCount);
      
      setIsCapturing(true);

      const animate = () => {
        if (analyserRef.current) {
            analyserRef.current.getByteFrequencyData(frequencyData);
            analyserRef.current.getByteTimeDomainData(waveformData);
            setAudioData({ frequencyData: [...frequencyData], waveformData: [...waveformData] });
            animationFrameRef.current = requestAnimationFrame(animate);
        }
      };

      animate();

    } catch (error) {
      console.error("Error capturing audio:", error);
      setIsCapturing(false);
    }
  };

  useEffect(() => {
    return () => {
      stopAudioCapture();
    };
  }, [stopAudioCapture]);

  return { audioData, isCapturing, startAudioCapture, stopAudioCapture };
};
