import React from 'react';
import { formatSeconds } from '../utils/format_seconds';

interface Props {
  mainTime: number;
}

export function Timer(props: Props): JSX.Element {
  return <div className="timer">{formatSeconds(props.mainTime)}</div>;
}
