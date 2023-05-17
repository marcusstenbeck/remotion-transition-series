import React from 'react';
import { Composition, Video, useCurrentFrame } from 'remotion';
import TransitionSeries from '../../src/TransitionSeries';
import { FadeThroughColor } from '../FadeThroughColor';

const Counter = ({ x, y }: { x: number; y: number }) => {
  const frame = useCurrentFrame();

  return (
    <div style={{ position: 'absolute', fontSize: 40, left: x, top: y }}>
      {frame}
    </div>
  );
};

const Vid1 = ({ src }: { src: string }) => {
  return (
    <>
      <Counter x={0} y={0} />
      <Video
        startFrom={1000}
        src={src}
        style={{ height: '100%', width: '100%' }}
      />
    </>
  );
};

const Vid2 = ({ src }: { src: string }) => {
  return (
    <>
      <Counter x={20} y={200} />
      <Video
        startFrom={1000}
        src={src}
        style={{ height: '100%', width: '100%' }}
      />
    </>
  );
};

const VideoTimeline = () => {
  const segments = [
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
  ];
  return (
    <TransitionSeries>
      <TransitionSeries.Sequence durationInFrames={300}>
        <Vid1 src={segments[0]} />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        durationInFrames={120}
        transitionComponent={FadeThroughColor}
      />
      <TransitionSeries.Sequence durationInFrames={600}>
        <Vid2 src={segments[1]} />
      </TransitionSeries.Sequence>
    </TransitionSeries>
  );
};

export const VideoTimelineComposition = () => (
  <Composition
    id="VideoTimeline"
    component={VideoTimeline}
    width={1920}
    height={1080}
    fps={60}
    durationInFrames={60 * 11}
  />
);
