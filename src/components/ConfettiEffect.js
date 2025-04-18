import React, { useEffect, useRef } from 'react';
import ConfettiJS from 'confetti-js';

const ConfettiEffect = () => {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const confettiSettings = {
      target: canvasRef.current,
      max: 150,
      size: 1.5,
      animate: true,
      props: ['circle', 'square', 'triangle', 'line'],
      colors: [[165,104,246], [230,61,135], [0,199,228], [253,214,126]],
      clock: 25,
      rotate: true,
      width: window.innerWidth,
      height: window.innerHeight,
      start_from_edge: true,
      respawn: true
    };
    
    const confetti = new ConfettiJS(confettiSettings);
    confetti.render();
    
    return () => {
      confetti.clear();
    };
  }, []);
  
  return (
    <canvas
      ref={canvasRef}
      className="confetti-container"
    />
  );
};

export default ConfettiEffect;
