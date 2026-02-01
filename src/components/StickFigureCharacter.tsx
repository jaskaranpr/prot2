import React, { useState, useEffect, useRef } from "react";

const StickFigureCharacter: React.FC = () => {
  const [eyePosition, setEyePosition] = useState({ x: 0, y: 0 });
  const [headRotation, setHeadRotation] = useState(0);
  const [isBlinking, setIsBlinking] = useState(false);
  const [gradientPos, setGradientPos] = useState({ x: 0, y: 0 });
  const characterRef = useRef<HTMLDivElement>(null);
  const headRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!characterRef.current || !headRef.current) return;

      const rect = characterRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Calculate angle and distance from character to mouse
      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;
      const angle = Math.atan2(deltaY, deltaX);
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

      // Limit eye movement to stay within head bounds (max 15px movement)
      const maxEyeMovement = 15;
      const eyeDistance = Math.min(distance / 30, maxEyeMovement);
      
      const eyeX = Math.cos(angle) * eyeDistance;
      const eyeY = Math.sin(angle) * eyeDistance;

      // Calculate head rotation (limit to ±20 degrees)
      const maxHeadRotation = 20;
      const headRotationAngle = (deltaX / window.innerWidth) * maxHeadRotation * 2;
      const clampedRotation = Math.max(-maxHeadRotation, Math.min(maxHeadRotation, headRotationAngle));

      // Calculate gradient position relative to head
      const headRect = headRef.current.getBoundingClientRect();
      const headCenterX = headRect.left + headRect.width / 2;
      const headCenterY = headRect.top + headRect.height / 2;
      const posX = e.clientX - headCenterX;
      const posY = e.clientY - headCenterY;

      setEyePosition({ x: eyeX, y: eyeY });
      setHeadRotation(clampedRotation);
      setGradientPos({ x: posX, y: posY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Blinking animation effect
  useEffect(() => {
    const scheduleBlink = () => {
      // Random interval between 2-5 seconds
      const randomDelay = Math.random() * 3000 + 2000;
      
      return setTimeout(() => {
        setIsBlinking(true);
        
        // Blink duration (eyes closed for 150ms)
        setTimeout(() => {
          setIsBlinking(false);
        }, 150);
      }, randomDelay);
    };

    let blinkTimeout = scheduleBlink();

    // Schedule next blink after current one completes
    const blinkInterval = setInterval(() => {
      clearTimeout(blinkTimeout);
      blinkTimeout = scheduleBlink();
    }, 5500);

    return () => {
      clearTimeout(blinkTimeout);
      clearInterval(blinkInterval);
    };
  }, []);

  return (
    <div className="stick-figure-canvas" ref={characterRef}>
      <div 
        ref={headRef}
        className="char-head"
        style={{
          transform: `rotate(${headRotation}deg)`,
          // @ts-ignore
          '--posX': gradientPos.x,
          '--posY': gradientPos.y,
        }}
      >
        <div className="char-eyes-container">
          <div 
            className="char-eye-left"
            style={{
              transform: `translate(${eyePosition.x}px, ${eyePosition.y}px) scaleY(${isBlinking ? 0.1 : 1})`,
            }}
          ></div>
          <div 
            className="char-eye-right"
            style={{
              transform: `translate(${eyePosition.x}px, ${eyePosition.y}px) scaleY(${isBlinking ? 0.1 : 1})`,
            }}
          ></div>
        </div>
      </div>
      <div className="char-body"></div>
    </div>
  );
};

export default StickFigureCharacter;
