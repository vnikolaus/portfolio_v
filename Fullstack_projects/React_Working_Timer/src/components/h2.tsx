import React from 'react';

interface Props {
  text: string;
}

export function H2(props: Props): JSX.Element {
  return <h2 className="h2">{props.text}</h2>;
}
