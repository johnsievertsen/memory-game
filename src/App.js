import './App.css';
import React, { useState } from 'react';

function App() {
  const [patternArray, setPatternArray] = useState([]);
  const [mimicArray, setMimicArray] = useState([]);
  const [logicStart, setLogicStart] = useState(false);
  const [score, setScore] = useState('Start');

  function handleStart(e) {
    e.target.style.display = 'none';
    setLogicStart(true);
    gameLogic();
  }

  function matchingArrays(e) {
    if (!logicStart) return;
    mimicArray.push(parseInt(e.target.id));
    console.log(mimicArray, patternArray);
    let lastEntry = mimicArray.length - 1;
    if (mimicArray[lastEntry] !== patternArray[lastEntry]) {
      document.getElementById('start-btn').style.display = 'block';
      setMimicArray([]);
      setPatternArray([]);
      setLogicStart(false);
      setScore(`Score: ${patternArray.length - 1}`)
      console.log('restarting')
    } else {
      if (mimicArray.length !== patternArray.length) {
        console.log(mimicArray[lastEntry], patternArray[lastEntry])
        console.log(mimicArray.length, patternArray.length, 'different length arrays');
        return;
      } else {
        console.log('same length arrays');
        gameLogic();
      }
    }
  }

  function gameLogic() {
    let ranNum = Math.floor(Math.random() * 4);
    patternArray.push(ranNum)
    let i = 0;
    sequence(i);
    function sequence(i) {
      setMimicArray([]);
      document.getElementById(patternArray[i]).style.backgroundColor = 'black';
      setTimeout(() => {
        // console.log(patternArray);
        if (patternArray[i] === 0) {
          document.getElementById(0).style.backgroundColor = 'red';
        } else if (patternArray[i] === 1) {
          document.getElementById(1).style.backgroundColor = 'green';
        } else if (patternArray[i] === 2) {
          document.getElementById(2).style.backgroundColor = 'blue';
        } else if (patternArray[i] === 3) {
          document.getElementById(3).style.backgroundColor = 'yellow';
        }
        i++;
        if (i < patternArray.length) {
          setTimeout(() => {
            sequence(i);
          }, 100);
        }
      }, 750);
    }
  }

  return (
    <div className="container">
      <button onClick={handleStart} type="button" className="start-btn" id="start-btn">{score}</button>
      <div onClick={matchingArrays} className="red" id='0'></div>
      <div onClick={matchingArrays} className="green" id='1'></div>
      <div onClick={matchingArrays} className="blue" id='2'></div>
      <div onClick={matchingArrays} className="yellow" id='3'></div>
    </div>
  );
}

export default App;