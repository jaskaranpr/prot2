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
          duration: 1000,
          ease: 'inOutQuart',
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
        
        // Animate the main bar
        timeline.add(bar, {
          translateY: '-100%',
          duration: 1000,
        }, index * 120); // 120ms delay between each bar (slower stagger)

        // Animate the gradient trail - starts slightly after the bar
        timeline.add(trail, {
          opacity: [0, 1],
          translateY: [0, '-100%'],
          duration: 1200,
          ease: 'inOutCubic',
        }, index * 120 + 50); // Trail starts 50ms after its bar

        // Fade out the trail
        timeline.add(trail, {
          opacity: 0,
          duration: 400,
          ease: 'outQuad',
        }, index * 120 + 800);
      });

      // Fade out the entire container after bars have moved
      timeline.add(containerRef.current!, {
        opacity: 0,
        duration: 400,
        ease: 'outQuad',
      }, '-=300');
    }, 400);

    return () => clearTimeout(startDelay);
  }, [onComplete]);

  // Create 8 bars with gradient trails
  const bars = Array.from({ length: 8 }, (_, index) => (
    <React.Fragment key={index}>
      {/* Gradient trail */}
      <div
        ref={(el) => {
          if (el) trailsRef.current[index] = el;
        }}
        className="loading-trail"
        style={{
          left: `${index * 12.5}%`,
          width: '12.5%',
          opacity: 0,
        }}
      />
      {/* Main bar */}
      <div
        ref={(el) => {
          if (el) barsRef.current[index] = el;
        }}
        className="loading-bar"
        style={{
          left: `${index * 12.5}%`,
          width: '12.5%',
        }}
      />
    </React.Fragment>
  ));

  return (
    <div 
      ref={containerRef}
      className="loading-screen"
    >
      {bars}
    </div>
  );
};

export default LoadingScreen;
