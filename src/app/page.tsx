import Link from "next/link";
import { start } from "repl";
import {random} from './utils';
import * as utils from './utils';

const HomePage: React.FC = () => {
  const stars: number = random(1, 9);
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="game">
        <div className="help">
          Pick 1 or more numbers that sum to the number of stars
        </div>
        <div className="body">
          <div className="left">
            {utils.range(1,stars).map((starId: number) =>
              <div key={starId} className="star" />
             )}
          </div>
          <div className="right">
            {utils.range(1,9).map((number:number) =>
                <button key={number} className="number">{number}</button>
              )}
            <button className="number">1</button>
            <button className="number">2</button>
            <button className="number">3</button>
            <button className="number">4</button>
            <button className="number">5</button>
            <button className="number">6</button>
            <button className="number">7</button>
            <button className="number">8</button>
            <button className="number">9</button>
          </div>
        </div>
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