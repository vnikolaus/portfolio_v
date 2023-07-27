import { zeroLeft } from './zero_left';

export function secondsToTime(seconds: number): string {
  const hour = zeroLeft(seconds / 3600);
  const second = zeroLeft(seconds % 60);
  const minute = zeroLeft((seconds / 60) % 60);
  return `${hour}h${minute}m${second}s`;
}
