import React from 'react';
import { TransitionImplementationProps } from '../src/components/Transition';

export const LinearWipe: React.FC<
  TransitionImplementationProps & {
    angle?: number;
  }
> = ({
  angle = 0,
  progress,
  exitingElement = null,
  enteringElement = null,
}) => {
  const a = (angle * Math.PI) / 180;
  const dist = Math.abs(Math.cos(a)) + Math.abs(Math.sin(a));

  const box = [
    [-1, -1],
    [-1, 1],
    [1, 1],
    [1, -1],
  ]
    .map(([x, y]) => [dist * x + dist * 2 * (1 - progress), dist * y])
    .map(([x, y]) => [
      x * Math.cos(a) - y * Math.sin(a),
      x * Math.sin(a) + y * Math.cos(a),
    ])
    .map(([x, y]) => [x + 1, y + 1])
    .map(([x, y]) => [50 * x, 50 * y]);

  const polygon = `polygon(${box
    .map((p) => `${p[0]}% ${p[1]}%`, [])
    .join(',')})`;

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
          clipPath: polygon,
        }}
      >
        {enteringElement}
      </div>
    </>
  );
};
