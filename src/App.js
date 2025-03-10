import React, { useState } from "react";
import "./App.css";

function App() {
  const [athleteName, setAthleteName] = useState("");
  const [swimTime, setSwimTime] = useState("");
  const [cycleTime, setCycleTime] = useState("");
  const [runTime, setRunTime] = useState("");
  const [penalty, setPenalty] = useState(0);
  const [transition, setTransition] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [error, setError] = useState("");

  const parseTime = (time) => {
    const minutesMatch = time.match(/(\d+)\s*min/);
    const secondsMatch = time.match(/(\d+)\s*sec/);

    const minutes = minutesMatch ? parseFloat(minutesMatch[1]) : 0;
    const seconds = secondsMatch ? parseFloat(secondsMatch[1]) : 0;

    return minutes * 60 + seconds; 
  };

  const calculateScore = () => {
    
    setError("");

   
    if (!athleteName || !swimTime || !cycleTime || !runTime) {
      setError("Please fill in all fields.");
      return;
    }

   
    const swimSeconds = parseTime(swimTime);
    const cycleSeconds = parseTime(cycleTime);
    const runSeconds = parseTime(runTime);

    if (isNaN(swimSeconds) || isNaN(cycleSeconds) || isNaN(runSeconds)) {
      setError("Please enter times in the format '5min 10sec'.");
      return;
    }

    
    const penaltySeconds = parseFloat(penalty) * 60;
    const transitionSeconds = parseFloat(transition) * 60; 

    if (isNaN(penaltySeconds) || isNaN(transitionSeconds)) {
      setError("Please enter valid numbers for penalty and transition.");
      return;
    }

   
    const totalSeconds =
      swimSeconds + cycleSeconds + runSeconds + penaltySeconds + transitionSeconds;

    
    const totalMinutes = totalSeconds / 60;
    setTotalScore(totalMinutes);
  };

  return (
    <div className="App">
     
      <header className="header">
        <h1>Triathlon Score Calculator</h1>
      </header>

      
      <section className="about-section">
        <h2>About the App</h2>
        <p>
          This app helps you calculate the total score for a triathlon event. Enter the athlete's name,
          event times (in the format "5min 10sec"), and any penalties or transition times. The app
          will compute the total score in minutes.
        </p>
        <h3>What are Transitions and Penalties?</h3>
        <p>
          <strong>Transitions:</strong> The time taken to switch between events (e.g., swimming to
          cycling or cycling to running). These are included in the total score.
        </p>
        <p>
          <strong>Penalties:</strong> Additional time added for rule violations, such as drafting or
          improper equipment.
        </p>
      </section>

    
      <section className="input-section">
        <h2>Enter Details</h2>
        {error && <p className="error">{error}</p>}
        <div className="input-container">
          <label>
            Athlete's Name:
            <input
              type="text"
              value={athleteName}
              onChange={(e) => setAthleteName(e.target.value)}
              placeholder="Enter athlete's name"
            />
          </label>
        </div>
        <div className="input-container">
          <label>
            Swimming Time:
            <input
              type="text"
              value={swimTime}
              onChange={(e) => setSwimTime(e.target.value)}
              placeholder="e.g., 5min 10sec"
            />
          </label>
        </div>
        <div className="input-container">
          <label>
            Cycling Time:
            <input
              type="text"
              value={cycleTime}
              onChange={(e) => setCycleTime(e.target.value)}
              placeholder="e.g., 20min 30sec"
            />
          </label>
        </div>
        <div className="input-container">
          <label>
            Running Time:
            <input
              type="text"
              value={runTime}
              onChange={(e) => setRunTime(e.target.value)}
              placeholder="e.g., 30min 45sec"
            />
          </label>
        </div>
        <div className="input-container">
          <label>
            Penalty Time (minutes):
            <input
              type="number"
              value={penalty}
              onChange={(e) => setPenalty(e.target.value)}
              min="0"
            />
          </label>
        </div>
        <div className="input-container">
          <label>
            Transition Time (minutes):
            <input
              type="number"
              value={transition}
              onChange={(e) => setTransition(e.target.value)}
              min="0"
            />
          </label>
        </div>
        <button onClick={calculateScore}>Calculate Total Score</button>
      </section>

      {totalScore > 0 && (
        <section className="score-card">
          <h2>Score Card</h2>
          <div className="card">
            <p>
              <strong>Athlete:</strong> {athleteName}
            </p>
            <p>
              <strong>Swimming Time:</strong> {swimTime}
            </p>
            <p>
              <strong>Cycling Time:</strong> {cycleTime}
            </p>
            <p>
              <strong>Running Time:</strong> {runTime}
            </p>
            <p>
              <strong>Penalty Time:</strong> {penalty} minutes
            </p>
            <p>
              <strong>Transition Time:</strong> {transition} minutes
            </p>
            <p>
              <strong>Total Score:</strong> {totalScore.toFixed(2)} minutes
            </p>
          </div>
        </section>
      )}
    </div>
  );
}

export default App;