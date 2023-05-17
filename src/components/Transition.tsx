import React, { ReactNode } from 'react';
import { Sequence, useCurrentFrame } from 'remotion';
import FadeTransition from './FadeTransition';

export type TransitionImplementationProps = {
  progress: number;
  exitingElement: ReactNode;
  enteringElement: ReactNode;
};

export type TransitionImplementation = React.FC<TransitionImplementationProps>;

const Transition: React.FC<{
  durationInFrames: number;
  from?: number;
  name?: string;
  exitingElement?: ReactNode;
  enteringElement?: ReactNode;
  transitionComponent?: (
    props: TransitionImplementationProps
  ) => React.ReactElement<any, any> | null;
}> = (props) => {
  const {
    durationInFrames,
    from = 0,
    name = 'Untitled Transition',
    exitingElement = null,
    enteringElement = null,
    transitionComponent = FadeTransition,
  } = props;

  const currentFrame = useCurrentFrame();

  const progress = (currentFrame - from) / (durationInFrames - 1);

  const exitingSequence = !React.isValidElement(exitingElement) ? (
    exitingElement
  ) : (
    <Sequence
      from={
        from -
        (exitingElement.props as { durationInFrames: number })
          .durationInFrames +
        durationInFrames
      }
      durationInFrames={
        (exitingElement.props as { durationInFrames: number }).durationInFrames
      }
    >
      {exitingElement}
    </Sequence>
  );

  const enteringSequence = !React.isValidElement(enteringElement) ? (
    enteringElement
  ) : (
    <Sequence
      from={from}
      durationInFrames={
        (enteringElement.props as { durationInFrames: number }).durationInFrames
      }
    >
      {enteringElement}
    </Sequence>
  );

  return transitionComponent({
    progress,
    enteringElement: enteringSequence,
    exitingElement: exitingSequence,
  });
};

export default Transition;
