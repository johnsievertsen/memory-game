import './App.css';
import React, { useState } from 'react';

function App() {
  const [patternArray, setPatternArray] = useState([]);
  const [mimicArray, setMimicArray] = useState([]);
  const [logicStart, setLogicStart] = useState(false);
  const [score, setScore] = useState('Start');

  function resetGameData() {
    document.getElementById('start-btn').style.display = 'block';
    setMimicArray([]);
    setPatternArray([]);
    setLogicStart(false);
  }

  function checkArrayLengths() {
    if (mimicArray.length !== patternArray.length) {
      return;
    } else {
      setTimeout(() => {gameLogic();}, 450);
    }
  }

  function getLastEntryIndex() {
    let lastEntry = mimicArray.length - 1;
    return lastEntry;
  }

  function handleStart(e) {
    e.target.style.display = 'none';
    setLogicStart(true);
    gameLogic();
  }

  function changeStyleOnClick(e) {
    const originalStyle = e.target.style
    switch (e.target.id) {
      case '0': 
        e.target.style.backgroundColor = "rgb(255, 88, 88)";
        setTimeout(() => {e.target.style = originalStyle;}, 250);
        break;
      case '1':
        e.target.style.backgroundColor = "rgb(0, 190, 0)";
        setTimeout(() => {e.target.style = originalStyle;}, 250);
        break;
      case '2':
        e.target.style.backgroundColor = "rgb(93, 93, 255)";
        setTimeout(() => {e.target.style = originalStyle;}, 250);
        break;
      case '3':
        e.target.style.backgroundColor = "rgb(255, 255, 149)";
        setTimeout(() => {e.target.style = originalStyle;}, 250);
        break;
    }
  }

  function matchingArrays(e) {
    if (!logicStart) return;
    changeStyleOnClick(e);
    mimicArray.push(parseInt(e.target.id));
    if (mimicArray[getLastEntryIndex()] !== patternArray[getLastEntryIndex()]) {
      resetGameData();
      setScore(`Score: ${patternArray.length - 1}`)
    } else {
      checkArrayLengths();
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