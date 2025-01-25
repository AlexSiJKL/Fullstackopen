/* eslint-disable react/prop-types */
import { useState } from 'react'

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

const Best = ({votes, anecdotes}) => {
  const maxValue = Math.max(...votes);
  const best = votes.indexOf(maxValue);
  if (maxValue === 0) {
    return (
      <div>
        <h1>Anecdote with most votes</h1>
        <p>No votes yet.</p>
      </div>
    );
  } else {
  return (
    <div>
      <h1>Anecdote with most votes</h1>
      <p>{anecdotes[best]}</p>
      <p>has {votes[best]} votes</p>
    </div>
  )
}
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0));
  const [selected, setSelected] = useState(getRandomInt(anecdotes.length))
  
  const handleNextAnecdote = () => {
    setSelected(getRandomInt(anecdotes.length)); // Update the selected index
  };

  const voteTheAnecdote = () => {
    const newVotes = [...votes];
    newVotes[selected] += 1;
    setVotes(newVotes);
  };

  return (
    <div>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <button onClick={voteTheAnecdote}>vote</button>
      <button onClick={handleNextAnecdote}>next anecdote</button>
      <Best
      anecdotes={anecdotes}
      votes={votes} />
    </div>
  )
}

export default App