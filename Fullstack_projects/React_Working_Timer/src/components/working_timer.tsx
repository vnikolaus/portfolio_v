import React, { useEffect } from 'react';
import { useInterval } from '../hooks/set_interval';
import { Button } from './button';
import { Timer } from './timer';
import { H2 } from './h2';
import { secondsToTime } from '../utils/seconds_to_time';
import { Paragraf } from './paragraf';
interface Props {
  workingTimer: number;
  shortRestTime: number;
  longRestTime: number;
  pomodoroCycles: number;
}

export function WorkingTimer(props: Props): JSX.Element {
  const [mainTime, setMaintime] = React.useState(props.workingTimer);
  const [timeCounting, setTimeCounting] = React.useState(false);
  const [working, setWorking] = React.useState(false);
  const [resting, setResting] = React.useState(false);
  const [outOfWork, setOutOfWork] = React.useState(false);
  const [cycles, setCycles] = React.useState(
    new Array(props.pomodoroCycles - 1).fill(true),
  );

  const [completedCycles, setCompletedCycles] = React.useState(0);
  const [fullWorkingTime, setFullWorkingTime] = React.useState(0);
  const [pomodoroCycle, setPomodoroCycle] = React.useState(0);

  useEffect(() => {
    if (working) document.body.classList.add('working');
    if (resting) document.body.classList.remove('working');

    if (!working && !resting) isOutOfWork();
    if (mainTime > 0) return;

    if (working && cycles.length > 0) {
      startResting(false);
      cycles.pop();
    } else if (working && cycles.length <= 0) {
      startResting(true);
      setCycles(new Array(props.pomodoroCycles - 1).fill(true));
      setCompletedCycles(completedCycles + 1);
    }

    if (working) setPomodoroCycle(pomodoroCycle + 1);
    if (resting) startWorking();
  }, [
    working,
    resting,
    mainTime,
    completedCycles,
    fullWorkingTime,
    pomodoroCycle,
  ]);

  useInterval(
    () => {
      setMaintime(mainTime - 1);
      if (working) setFullWorkingTime(fullWorkingTime + 1);
    },
    timeCounting ? 1000 : null,
  );

  const startWorking = () => {
    setTimeCounting(true);
    setWorking(true);
    setResting(false);
    setOutOfWork(false);
    setMaintime(props.workingTimer); // seta o 1500 do workingTimer quando clicar em work;
  };

  const startResting = (longRest: boolean) => {
    setTimeCounting(true);
    setWorking(false);
    setResting(true);
    setOutOfWork(false);

    longRest
      ? setMaintime(props.longRestTime)
      : setMaintime(props.shortRestTime);
  };

  const isOutOfWork = () => {
    document.body.classList.remove('working');
    setTimeCounting(false);
    setMaintime(0o0);
    setWorking(false);
    setResting(false);
    setOutOfWork(true);
  };

  return (
    <div className="pomodoro">
      <H2
        text={
          outOfWork
            ? 'You are: Out of Work'
            : resting
            ? 'You are: Resting'
            : 'You are: Working'
        }
      />
      <Timer mainTime={mainTime} />

      <div className="controls">
        <Button text="Work..." onClick={() => startWorking()}></Button>
        <Button
          className={outOfWork ? 'hidden' : ''}
          text="Rest..."
          onClick={() => startResting(false)}
        ></Button>
        <Button
          className={!working && !resting ? 'hidden' : ''}
          text={timeCounting ? 'Pause' : 'Play'}
          onClick={() => setTimeCounting(!timeCounting)}
        ></Button>
        <Button
          className={!working && !resting ? 'hidden' : ''}
          text="Out of Work"
          onClick={() => isOutOfWork()}
        ></Button>
      </div>

      <div className="details">
        <Paragraf text="Cycles completed: " info={completedCycles} />
        <Paragraf text="Pomodoro Cycle: " info={pomodoroCycle} />
        <Paragraf
          text="Total Working: "
          info={secondsToTime(fullWorkingTime)}
        />
      </div>
    </div>
  );
}
