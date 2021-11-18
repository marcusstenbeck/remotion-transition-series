import React from 'react';
import { TransitionImplementation } from '../src/components/Transition';

export const Dissolve: TransitionImplementation = ({
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
          opacity: progress,
        }}
      >
        {enteringElement}
      </div>
    </>
  );
};
