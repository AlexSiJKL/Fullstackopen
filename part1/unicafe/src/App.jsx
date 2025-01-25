/* eslint-disable react/prop-types */
import { useState } from 'react'

const Statistic = ({good, neutral, bad}) => {
  return (
    <div>
    <h1>Statistic</h1>
    <p>good {good}</p>
    <p>neutral {neutral}</p>
    <p>bad {bad}</p>
    <p>all {good + neutral + bad}</p>
    <p>average {(good - bad) / (good + neutral + bad)}</p>
    <p>positive {good / ((good + neutral + bad) / 100)} %</p>
    </div>
  )
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