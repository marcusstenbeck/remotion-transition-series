import React from 'react';
import { TransitionImplementationProps } from '../src/components/Transition';

export const SlidingDoors: React.FC<
  TransitionImplementationProps & {
    direction?: 'open' | 'close';
    angle?: number;
  }
> = ({
  direction = 'open',
  angle = 0,
  progress: inProgress,
  exitingElement = null,
  enteringElement = null,
}) => {
  const a = (angle * Math.PI) / 180;
  const dist = Math.abs(Math.cos(a)) + Math.abs(Math.sin(a));
  const progress = direction === 'close' ? 1 - inProgress : inProgress;

  const box = [
    [-1, -1],
    [-1, 1],
    [1, 1],
    [1, -1],
  ]
    .map(([x, y]) => [x + 1, y])
    .map(([x, y]) => [dist * x, dist * y])
    .map(([x, y]) => [
      x * Math.cos(a) - y * Math.sin(a),
      x * Math.sin(a) + y * Math.cos(a),
    ])
    .map(([x, y]) => [50 + 50 * x, 50 + 50 * y]);

  const inverseBox = [
    [-1, -1],
    [-1, 1],
    [1, 1],
    [1, -1],
  ]

    .map(([x, y]) => [x + 1, y])
    .map(([x, y]) => [dist * x, dist * y])

    .map(([x, y]) => [
      x * Math.cos(Math.PI + a) - y * Math.sin(Math.PI + a),
      x * Math.sin(Math.PI + a) + y * Math.cos(Math.PI + a),
    ])
    .map(([x, y]) => [50 + 50 * x, 50 + 50 * y]);

  const polygon = `polygon(${box
    .map((p) => `${p[0]}% ${p[1]}%`, [])
    .join(',')})`;
  const inversePolygon = `polygon(${inverseBox
    .map((p) => `${p[0]}% ${p[1]}%`, [])
    .join(',')})`;

  const translateFunction = (() => {
    const adjustedAngle = angle % 180;
    if (adjustedAngle >= -45 && adjustedAngle <= 45) {
      return 'translateX';
    }
    if (adjustedAngle < -135 || adjustedAngle > 135) {
      return 'translateX';
    }

    return 'translateY';
  })();

  const hypotenuse =
    translateFunction === 'translateX'
      ? dist / Math.cos(a)
      : dist / Math.sin(a);
  const translateLength = 50 * hypotenuse;
  const translateProgress = progress;

  return (
    <>
      {direction === 'close' && (
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
              transform: `${translateFunction}(${
                translateLength * translateProgress
              }%)`,
            }}
          >
            {enteringElement}
          </div>
          <div
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              right: 0,
              bottom: 0,
              clipPath: inversePolygon,
              transform: `${translateFunction}(${
                -translateLength * translateProgress
              }%)`,
            }}
          >
            {enteringElement}
          </div>
        </>
      )}
      {direction === 'open' && (
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
            {enteringElement}
          </div>
          <div
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              right: 0,
              bottom: 0,
              clipPath: polygon,
              transform: `${translateFunction}(${
                translateLength * translateProgress
              }%)`,
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
              clipPath: inversePolygon,
              transform: `${translateFunction}(${
                -translateLength * translateProgress
              }%)`,
            }}
          >
            {exitingElement}
          </div>
        </>
      )}
    </>
  );
};
