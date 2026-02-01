import React, { useEffect, useRef } from 'react';
import { createTimeline } from 'animejs';

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const barsRef = useRef<HTMLDivElement[]>([]);
  const trailsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    // Small delay before starting animation for visual impact
    const startDelay = setTimeout(() => {
      // Create timeline for staggered animation
      // Animate from rightmost bar (index 7) to leftmost (index 0)
      const timeline = createTimeline({
        defaults: {
          duration: 1200,
          ease: 'outExpo', // Apple-style smooth deceleration
        },
        onComplete: () => {
          onComplete();
        }
      });

      // Get bars in reverse order (rightmost first)
      const reversedBars = [...barsRef.current].reverse();

      // Animate each bar from right to left with staggered delay
      reversedBars.forEach((bar, barIdx) => {
        const staggerDelay = barIdx * 100; // 100ms stagger between bars
        
        // Animate the main bar sliding up
        timeline.add(bar, {
          translateY: '-100%',
          duration: 1200,
          ease: 'outExpo',
        }, staggerDelay);

        // Animate single trail per bar with stretching effect and motion blur
        const originalBarIndex = 7 - barIdx;
        const trail = trailsRef.current[originalBarIndex];
        const trailDelay = staggerDelay + 20; // Start 20ms after bar
        
        timeline.add(trail, {
          // opacity: [1,1],
          translateY: [0, '-140%'],
          scaleY: [0, 1.5, 1, 0.5],
          duration: 1200, // Longer than bar's 1200ms for trailing effect
          ease: 'outExpo',
        }, trailDelay);
      });

      // Fade out the entire container smoothly
      timeline.add(containerRef.current!, {
        opacity: 0,
        duration: 500,
        ease: 'outQuad',
      }, '-=400');
    }, 500);

    return () => clearTimeout(startDelay);
  }, [onComplete]);

  // Create 8 bars with gradient trails - trails rendered AFTER bars for proper z-index
  const bars = Array.from({ length: 8 }, (_, index) => (
    <div
      key={`bar-${index}`}
      ref={(el) => {
        if (el) barsRef.current[index] = el;
      }}
      className="loading-bar"
      style={{
        left: `${index * 12.5}%`,
        width: '12.5%',
      }}
    />
  ));

  const trails = Array.from({ length: 8 }, (_, barIndex) => {
    return (
      <div
        key={`trail-${barIndex}`}
        ref={(el) => { if (el) trailsRef.current[barIndex] = el; }}
        className={`loading-trail loading-trail-bar-${barIndex}`}
        style={{
          left: `${barIndex * 12.5}%`,
          width: '12.5%',
          opacity: 1,
        }}
      />
    );
  });

  return (
    <div 
      ref={containerRef}
      className="loading-screen"
    >
      {/* Bars first (behind), then trails (on top) */}
      {trails}
      {bars}
    </div>
  );
};

export default LoadingScreen;
