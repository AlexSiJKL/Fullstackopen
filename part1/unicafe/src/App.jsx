/* eslint-disable react/prop-types */
import { useState } from 'react'

const Button = ({text, onClick}) => {
  return(
    <button onClick={onClick}>{text}</button>
  )
}

const StatisticLine = ({text, value}) => {
  return(
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistic = ({good, neutral, bad}) => {
  const all = good + neutral + bad
  const average = all > 0 ? (good - bad) / all : 0;
  const positive = all > 0 ? (good / all) * 100 : 0;

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
    <table>
      <tbody>
        <StatisticLine text="good" value={good}/>
        <StatisticLine text="neutral" value={neutral}/>
        <StatisticLine text="bad" value={bad}/>
        <StatisticLine text="all" value={all}/>
        <StatisticLine text="average" value={average}/>
        <StatisticLine text="positive" value={`${positive} %`}/>
        </tbody>
    </table>
    </div>
  )
}
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const setToGood = () => {
    const newGood = good + 1
    setGood(newGood)
  }

  const setToNeutral = () => {
    const newNeutral = neutral + 1
    setNeutral(newNeutral)
  }

  const setToBad = () => {
    const newBad = bad + 1
    setBad(newBad)
  }

  return (
    <div>
      <h1>Give feedback</h1>
      <Button text="good" onClick={setToGood} />
      <Button text="neutral" onClick={setToNeutral} />
      <Button text="bad" onClick={setToBad} />
      <Statistic 
      good={good}
      neutral={neutral}
      bad={bad} />
    </div>
  )
}

export default App