/* eslint-disable react/prop-types */
import { useState } from 'react'

const Statistic = ({good, neutral, bad}) => {
  const all = good + neutral + bad
  if (all === 0) {
   return (
    <div>
      <p>No feedback given</p>
    </div>
  );
  } else {
  return (
    <div>
      <h1>Statistic</h1>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {all}</p>
      <p>average {(good - bad) / all}</p>
      <p>positive {good / (all / 100)} %</p>
    </div>
  )
}
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>Give feedback</h1>
      <button onClick={() => setGood(good + 1)}>Good</button>
      <button onClick={() => setNeutral(neutral + 1)}>Neutral</button>
      <button onClick={() => setBad(bad + 1)}>Bad</button>
      <Statistic 
      good={good}
      neutral={neutral}
      bad={bad} />
    </div>
  )
}

export default App