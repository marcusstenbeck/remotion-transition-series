import React, { CSSProperties } from 'react';
import { TransitionImplementationProps } from '../src/components/Transition';

export const FadeThroughColor: React.FC<
  TransitionImplementationProps & { color?: CSSProperties['backgroundColor'] }
> = ({
  color = 'black',
  progress,
  exitingElement = null,
  enteringElement = null,
}) => {
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
        {exitingElement}
      </div>
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          right: 0,
          bottom: 0,
          backgroundColor: color,
          opacity: Math.min(1, progress * 2),
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          right: 0,
          bottom: 0,
          opacity: Math.max(0, 2 * progress - 1),
        }}
      >
        {enteringElement}
      </div>
    </>
  );
};
