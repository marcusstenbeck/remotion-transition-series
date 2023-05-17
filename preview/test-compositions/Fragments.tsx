import React from 'react';
import { Composition, useCurrentFrame, useVideoConfig } from 'remotion';
import TransitionSeries from '../../src/TransitionSeries';
import { TransitionImplementationProps } from '../../src/components/Transition';
import { Plate } from '../Plate';
import { Slide } from '../Slide';

const FrameCounter = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  return (
    <div style={{ position: 'absolute', left: 20, top: 20, fontSize: 20 }}>
      {frame + 1}/{durationInFrames}
    </div>
  );
};

const Transition: React.FC<{
  transitionComponent: (
    props: TransitionImplementationProps
  ) => React.ReactElement<any, any> | null;
}> = ({ transitionComponent }) => {
  return (
    <TransitionSeries>
      <TransitionSeries.Sequence durationInFrames={60}>
        <Plate style={{ backgroundColor: 'salmon', color: 'black' }}>
          <FrameCounter />A
        </Plate>
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        durationInFrames={30}
        transitionComponent={transitionComponent}
      />

      <TransitionSeries.Sequence durationInFrames={80}>
        <Plate style={{ backgroundColor: 'indigo', color: 'white' }}>
          <FrameCounter />B
        </Plate>
      </TransitionSeries.Sequence>
    </TransitionSeries>
  );
};

const WithFragments = () => {
  const slides = [
    { text: 'A', styles: { backgroundColor: 'salmon', color: 'black' } },
    { text: 'B', styles: { backgroundColor: 'blue', color: 'white' } },
    { text: 'C', styles: { backgroundColor: 'magenta', color: 'black' } },
    { text: 'D', styles: { backgroundColor: 'indigo', color: 'white' } },
  ];

  return (
    <TransitionSeries>
      <TransitionSeries.Sequence durationInFrames={45}>
        <Plate style={{ backgroundColor: 'white', color: 'black' }}>
          <FrameCounter />
          First
        </Plate>
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition durationInFrames={15} />

      {slides.map((slide, index) => (
        <React.Fragment key={`${JSON.stringify(slide)}${index}`}>
          {index !== 0 && (
            <TransitionSeries.Transition
              durationInFrames={15}
              transitionComponent={Slide}
            />
          )}
          <TransitionSeries.Sequence durationInFrames={60}>
            <Plate style={slide.styles}>
              <FrameCounter />
              {slide.text}
            </Plate>
          </TransitionSeries.Sequence>
        </React.Fragment>
      ))}

      <TransitionSeries.Transition durationInFrames={15} />

      <TransitionSeries.Sequence durationInFrames={60}>
        <Plate style={{ backgroundColor: 'black', color: 'white' }}>
          <FrameCounter />
          Last
        </Plate>
      </TransitionSeries.Sequence>
    </TransitionSeries>
  );
};

export const FragmentsComposition = () => (
  <Composition
    id="WithFragments"
    component={WithFragments}
    width={1920}
    height={1080}
    fps={30}
    durationInFrames={270}
  />
);
