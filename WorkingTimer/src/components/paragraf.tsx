import React from 'react';

interface Props {
  text: string;
  info: number | string;
  className?: string;
}

export function Paragraf(props: Props): JSX.Element {
  return (
    <p className={props.className}>
      {props.text}
      {props.info}
    </p>
  );
}
