import React from 'react';
import { useVideoConfig } from 'remotion';
import { TransitionImplementationProps } from '../src/components/Transition';

export const CircularWipe: React.FC<
  TransitionImplementationProps & { direction?: 'in' | 'out' }
> = ({
  direction = 'out',
  progress: inProgress,
  exitingElement = null,
  enteringElement = null,
}) => {
  const { width: w, height: h } = useVideoConfig();
  const radius = 0.5 * Math.sqrt(w * w + h * h);
  const isOut = direction === 'out';
  const progress = isOut ? inProgress : 1 - inProgress;
  const polygon = `circle(${radius * progress}px)`;

  return (
    <>
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          right: 0,
          bottom: 0,
        }}
      >
        {isOut ? exitingElement : enteringElement}
      </div>
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          right: 0,
          bottom: 0,
          clipPath: polygon,
        }}
      >
        {isOut ? enteringElement : exitingElement}
      </div>
    </>
  );
};
