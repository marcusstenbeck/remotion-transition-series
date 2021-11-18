# remotion-transition-series

A `TransitionSeries` component for [Remotion](https://www.remotion.dev/).

Included in this repo are the following transitions:

- Dissolve
- FadeThroughColor
- Pan
- Slide
- SlidingDoors
- LinearWipe
- CircularWipe

They can be seen in a video here: https://twitter.com/marcusstenbeck/status/1446420801918586888

## Setup

```
npm install remotion-transition-series
```

## Preview

To start the Remotion Preview of run:

```
npm run preview
```

## Examples

Take a look at the `preview` folder. In it you'll find a bunch of transitions.

### With defaults for the `CircularWipe` transition.

```jsx
<TransitionSeries>
  <TransitionSeries.Sequence durationInFrames={60}>
    <div>Hello</div>
  </TransitionSeries.Sequence>

  <TransitionSeries.Transition
    durationInFrames={30}
    transitionComponent={CircularWipe}
  />

  <TransitionSeries.Sequence durationInFrames={60}>
    <div>World</div>
  </TransitionSeries.Sequence>
</TransitionSeries>
```

### Using custom props with the `CircularWipe` transition

```jsx
<TransitionSeries>
  <TransitionSeries.Sequence durationInFrames={60}>
    <div>Hello</div>
  </TransitionSeries.Sequence>

  <TransitionSeries.Transition
    durationInFrames={30}
    transitionComponent={(props) => <CircularWipe {...props} direction="in" />}
  />

  <TransitionSeries.Sequence durationInFrames={60}>
    <div>World</div>
  </TransitionSeries.Sequence>
</TransitionSeries>
```

### Custom easing with `CircularWipe` transition

```jsx
import { Easing } from 'remotion';

// ...

<TransitionSeries>
  <TransitionSeries.Sequence durationInFrames={60}>
    <div>Hello</div>
  </TransitionSeries.Sequence>

  <TransitionSeries.Transition
    durationInFrames={30}
    transitionComponent={(props) => (
      <CircularWipe {...props} progress={Easing.inOut(Easing.exp)} />
    )}
  />

  <TransitionSeries.Sequence durationInFrames={60}>
    <div>World</div>
  </TransitionSeries.Sequence>
</TransitionSeries>;
```

## Docs

### `<TransitionSeries>`

See: https://www.remotion.dev/docs/series

### `<TransitionSeries.Transition />`

For other props, see: https://www.remotion.dev/docs/sequence

#### `transitionComponent`

A component that renders the transition.

Props

- `progress` between `0` to `1`
- `exitingElement` is the previous sequence in the series
- `enteringElement` is the next sequence in the series

```
(props: {
  progress: number;
  exitingElement: ReactNode;
  enteringElement: ReactNode;
}) => ReactNode;
```

## Contributing

Feel free to open pull requests or file issues.

## Author

[@marcusstenbeck](https://twitter.com/marcusstenbeck)
