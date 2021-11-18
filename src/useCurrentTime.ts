import { useCurrentFrame, useVideoConfig } from 'remotion';

export default function useCurrentTime() {
  const config = useVideoConfig();
  const currentFrame = useCurrentFrame();

  return (1000 * currentFrame) / config.fps;
}
