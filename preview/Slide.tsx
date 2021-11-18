import React from 'react';
import { TransitionImplementationProps } from '../src/components/Transition';

export const Slide: React.FC<
  TransitionImplementationProps & {
    direction: 'up' | 'down' | 'left' | 'right';
  }
> = ({
  direction = 'left',
  progress,
  exitingElement = null,
  enteringElement = null,
}) => {
  const sign = direction === 'right' || direction === 'down' ? 1 : -1;
  const percentComplete = 100 * progress;
  const translateFunction =
    direction === 'right' || direction === 'left' ? 'translateX' : 'translateY';
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
          transform: `${translateFunction}(${sign * (percentComplete - 100)}%)`,
        }}
      >
        {enteringElement}
      </div>
    </>
  );
};
