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

      // Get bars and trails in reverse order (rightmost first)
      const reversedBars = [...barsRef.current].reverse();
      const reversedTrails = [...trailsRef.current].reverse();

      // Animate each bar from right to left with staggered delay
      reversedBars.forEach((bar, index) => {
        const trail = reversedTrails[index];
        const staggerDelay = index * 100; // 100ms stagger between bars
        
        // Animate the main bar sliding up
        timeline.add(bar, {
          translateY: '-100%',
          duration: 1200,
          ease: 'outExpo',
        }, staggerDelay);

        // Animate the gradient trail - starts AFTER the bar with a delay, creating trailing effect
        timeline.add(trail, {
          opacity: [0, 1, 1, 0],
          translateY: ['30%', '-100%'],
          duration: 1600,
          ease: 'outExpo',
        }, staggerDelay + 150); // Trail starts 150ms after its bar
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

  const trails = Array.from({ length: 8 }, (_, index) => (
    <div
      key={`trail-${index}`}
      ref={(el) => {
        if (el) trailsRef.current[index] = el;
      }}
      className={`loading-trail loading-trail-${index}`}
      style={{
        left: `${index * 12.5}%`,
        width: '12.5%',
        opacity: 0,
      }}
    />
  ));

  return (
    <div 
      ref={containerRef}
      className="loading-screen"
    >
      {/* Bars first (behind), then trails (on top) */}
      {bars}
      {trails}
    </div>
  );
};

export default LoadingScreen;
