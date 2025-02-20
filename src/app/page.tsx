"use client";
import React from "react";

import Link from "next/link";
import { useState, useEffect } from "react";
import {random, range} from './utils';

const HomePage: React.FC = () => {
  const [stars, setStars] = useState<number[]>([]);
  
  //This will randomize the stars from 1 to 9
  const randomizeStars = () => {
    const starCount = random(1, 9);
    setStars(range(1, starCount));
  };
  
  //This will hold the position of the stars
  useEffect(() => {
    randomizeStars();
  }, []);
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="game">
        <div className="help">
          Pick 1 or more numbers that sum to the number of stars
        </div>
        <section className="body">
          <div className="body">
            <div className="left" style={{border: '1px solid red', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px'}}>
              {range(1,9).map((starId: number) =>
                <div key={starId} className="star" style={{width: '20px', height: '20px', backgroundColor: stars.includes(starId) ? "yellow" : "transparent"}}/>
              )}
            </div>
            <div className="right" style={{border: '1px solid', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px'}}>
              {range(1,9).map((number:number) =>
                  <button key={number} className="number" style={{margin: '5px'}}>{number}</button>
                )}
            </div>
          </div>
        </section>
        <div className="timer">Time Remaining: 10</div>
      </div>
    </main>
  );
}


// Color Theme
const colors = {
  available: 'lightgray',
  used: 'lightgreen',
  wrong: 'lightcoral',
  candidate: 'deepskyblue',
};

export default HomePage;