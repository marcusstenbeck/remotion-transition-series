import React from 'react';
import {
  Composition,
  Easing,
  Folder,
  registerRoot,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import TransitionSeries from '../src/TransitionSeries';
import { TransitionImplementationProps } from '../src/components/Transition';
import { CircularWipe } from './CircularWipe';
import { Dissolve } from './Dissolve';
import { FadeThroughColor } from './FadeThroughColor';
import { LinearWipe } from './LinearWipe';
import { Pan } from './Pan';
import { Plate } from './Plate';
import { Slide } from './Slide';
import { SlidingDoors } from './SlidingDoors';
import { VideoTimelineComposition } from './test-compositions/VideoTimeline';
import { FragmentsComposition } from './test-compositions/Fragments';

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

const WithFragment = () => {
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

const easeInOutExp = Easing.inOut(Easing.exp);

export const RemotionVideo: React.FC = () => {
  const transitionVariants: {
    name: string;
    component: (
      props: TransitionImplementationProps
    ) => React.ReactElement<any, any> | null;
  }[] = [
    { name: 'Dissolve', component: Dissolve },
    { name: 'FadeThroughColor', component: FadeThroughColor },
    {
      name: 'Pan',
      component: ({ progress, ...props }) => (
        <Pan {...props} progress={easeInOutExp(progress)} />
      ),
    },
    {
      name: 'Slide',
      component: ({ progress, ...props }) => (
        <Slide {...props} progress={easeInOutExp(progress)} />
      ),
    },
    {
      name: 'SlidingDoors',
      component: ({ progress, ...props }) => (
        <SlidingDoors {...props} angle={70} progress={easeInOutExp(progress)} />
      ),
    },
    {
      name: 'LinearWipe',
      component: ({ progress, ...props }) => (
        <LinearWipe angle={70} {...props} progress={easeInOutExp(progress)} />
      ),
    },
    {
      name: 'CircularWipe',
      component: ({ progress, ...props }) => (
        <CircularWipe {...props} progress={easeInOutExp(progress)} />
      ),
    },
  ];

  return (
    <>
      <Folder name="Transitions">
        {transitionVariants.map(({ name, component: tc }) => (
          <Composition
            key={name}
            id={name}
            component={() => <Transition transitionComponent={tc} />}
            width={1920}
            height={1080}
            fps={30}
            durationInFrames={110}
          />
        ))}
      </Folder>

      <Folder name="TestCompositions">
        <FragmentsComposition />
        <VideoTimelineComposition />
      </Folder>
    </>
  );
};

registerRoot(RemotionVideo);
