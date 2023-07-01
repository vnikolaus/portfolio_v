import React from 'react';
import { WorkingTimer } from './components/working_timer';

function App() {
  return (
    <div className="app">
      <WorkingTimer
        workingTimer={1500}
        shortRestTime={300}
        longRestTime={900}
        pomodoroCycles={4}
      />
    </div>
  );
}

export default App;
