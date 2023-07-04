import { zeroLeft } from './zero_left';

export function formatSeconds(seconds: number): string {
  const second = zeroLeft(seconds % 60);
  const minute = zeroLeft((seconds / 60) % 60);
  return `${minute}:${second}`;
}
