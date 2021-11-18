import React, { HTMLAttributes } from 'react';

export const Plate = React.forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ style, ...props }, forwardedRef) => (
  <div
    ref={forwardedRef}
    style={{
      position: 'absolute',
      left: 0,
      top: 0,
      right: 0,
      bottom: 0,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: 540,
      ...style,
    }}
    {...props}
  />
));
