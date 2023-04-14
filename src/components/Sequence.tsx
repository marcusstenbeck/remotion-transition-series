import React from 'react';
import {
  Sequence,
  useCurrentFrame,
  useVideoConfig,
  VideoConfig,
} from 'remotion';
import useCurrentTime from '../useCurrentTime';

type TransitionSequenceChildrenFunction = (props: {
  currentFrame: number;
  currentTime: number;
  videoConfig: VideoConfig;
}) => React.ReactElement;

const ChildWrapper: (props: {
  children: TransitionSequenceChildrenFunction;
}) => React.ReactElement = ({ children }) => {
  const videoConfig = useVideoConfig();
  const currentFrame = useCurrentFrame();
  const currentTime = useCurrentTime();

  return <>{children({ currentFrame, currentTime, videoConfig })}</>;
};

const TransitionSeriesSequence: React.FC<{
  durationInFrames: number;
  from?: number;
  name?: string;
  children: TransitionSequenceChildrenFunction | React.ReactElement;
}> = ({ name, children, durationInFrames, from = 0 }) => {
  return (
    <Sequence name={name} from={from} durationInFrames={durationInFrames}>
      {typeof children === 'function' ? (
        <ChildWrapper>{children}</ChildWrapper>
      ) : (
        children
      )}
    </Sequence>
  );
};

export default TransitionSeriesSequence;
