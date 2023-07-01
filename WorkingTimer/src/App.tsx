import React from 'react';
import { PomodoroTimer } from './components/pomodoro_timer';

function App() {
  return (
    <div className="app">
      <PomodoroTimer
        workingTimer={1500}
        shortRestTime={300}
        longRestTime={900}
        pomodoroCycles={4}
      />
    </div>
  );
}

export default App;
