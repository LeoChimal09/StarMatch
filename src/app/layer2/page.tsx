"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import {random, range, sum, randomSumIn} from '../utils';

//This defines the props for the PlayNumber component and ensures type safety
interface PlayNumberProps {
  number: number;
  onClick: (number: number, currentStatus:string) => void;
  status: keyof typeof colors;
  disabled: boolean;
}

// Color Theme
const colors = {
  available: 'lightgray',
  used: 'lightgreen',
  wrong: 'red',
  candidate: 'deepskyblue',
};

//Child components will be aware of the props being used in PlayNumberProps
const PlayNumber: React.FC<PlayNumberProps> = (props) => {
  return (
    <button className="number" 
      style={{margin: '5px', backgroundColor: colors[props.status], color: 'black' }} 
      onClick={() => props.onClick(props.number, props.status)}
      disabled={props.disabled}
    >
      {props.number}
    </button>
  );
};

//this defines the StarsDisplay to execute its cycle
const StarsDisplay: React.FC<{count:number}> = ({count}) => (
  <>
    {range(1,count).map ((starId) => (
      <div key = {starId} className="star" style={{width: '20px', height: '20px', backgroundColor: 'yellow', color: "black"}} />
    ))}
  </>
);

//this will be the button that uses a function to reset the game
const PlayAgain: React.FC<{onClick: () => void }> = ({onClick}) => (
  <div className="game-done">
    <button 
      style={{margin: '10px', backgroundColor: 'white', color: 'black', width: "120px", height: '40px' }} 
    onClick = {onClick}
    >
      Play Again
      </button>
  </div>
)

const HomePage: React.FC = () => {
  const [stars, setStars] = useState<number>(0);
  const [availableNums, setAvailableNums] = useState(range(1,9));
  const [candidateNums, setCanditateNums] = useState<number[]>([]);
  const [selectedNumbers, setSelectedNumbers] = useState<number[]>([]);
  const [gameIsDone, setGameIsDone] = useState<boolean>(false);
  const [secondsLeft, setSecondsLeft] = useState(10);
  
  // setTimeout
  useEffect(() => {
    if (secondsLeft > 0) {
      const timerId = setTimeout(() => {
        setSecondsLeft(secondsLeft-1);
      }, 1000);
      return () => clearTimeout(timerId);
    } else {
      setGameIsDone(true);
    }
  }, [secondsLeft]
);

  const candidatesAreWrong = sum(candidateNums) > stars;
  
  const numberStatus = (number:number): keyof typeof colors => {
    if (!availableNums.includes(number)) {
      return 'used';
    }
    if (candidateNums.includes(number)) {
      return candidatesAreWrong ? 'wrong' : 'candidate';
    }
    return 'available';
};

  //This will randomize the stars from 1 to 9
  const randomizeStars = () => {
    const starCount = random(1, 9);
    setStars(starCount);
  };
  
  //This will hold the position of the stars
  useEffect(() => {
    randomizeStars();
  }, []);

  const handleNumberClick = (number: number, currentStatus: string) => {
    if (currentStatus === 'used') {
      return;
    }
    // candidateNums
    const newCandidateNums = 
      currentStatus === 'available'
        ? [...candidateNums, number]
        : candidateNums.filter((cn) => cn !== number);

    if (sum(newCandidateNums) !== stars) {
      setCanditateNums(newCandidateNums);
    } else {
      const newAvailableNums = availableNums.filter(
        (n) => !newCandidateNums.includes(n)
      );
      setAvailableNums(newAvailableNums);
      setCanditateNums([]);
      setStars(randomSumIn(newAvailableNums, 9));

      // Check if the game is done
      if (newAvailableNums.length === 0) {
        setGameIsDone(true);
      }
    }
  };

  const handlePlayAgain = () => {
    setStars(5);
    setAvailableNums(range(1,9));
    setCanditateNums([]);
    setSelectedNumbers([]);
    setGameIsDone(false);
    setSecondsLeft(10);
  };
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
        <h1 className="text-4xl font-bold item-center">Welcome to Star Match Game</h1>
        <div className="game">
        <div className="help">
          Pick 1 or more numbers that sum to the number of stars
        </div>
        <section className="body">
          <div className="body">
            <div className="left" style={{border: '1px solid red', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', minHeight: '120px'}}>
              {secondsLeft > 0 && availableNums.length > 0 ? (
                <StarsDisplay count={stars} /> 
              ) : (
                <>
                <PlayAgain onClick={handlePlayAgain} />
                </>
              )}
            </div>
            <div className="right" style={{border: '1px solid red', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px'}}>
              {range(1,9).map((number:number) => (
                <PlayNumber
                  key={number}
                  number={number}
                  onClick={handleNumberClick}
                  status={numberStatus(number)}
                  disabled={secondsLeft ===0 || gameIsDone}
                />
              ))}
            </div>
          </div>
        </section>
        <div className="timer">Time Remaining: {secondsLeft}</div>
      </div>
    </main>
  );
}

export default HomePage;