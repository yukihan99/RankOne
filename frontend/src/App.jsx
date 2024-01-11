//import { BrowserRouter, Routes, Route } from "react-router-dom";
import Leaderboard from "./components/Leaderboard"
import Navbar from "./components/Navbar";
import WALL from "./constants/wall.jpg"
import './App.css'

function App() {
  return (
    <div className="App">
      <div class="slide">
        <Navbar/>
      <div class="val">
        <img class="wall" src={WALL} alt="wall"></img>
        <div class="text">
          <h1>VALORANT</h1>
          <h1>LEADERBOARDS</h1>
          <p>Ever wonder how long the BEST of the BEST players maintain rank one? Scroll to find out.</p>
        </div>
      </div>
      

      <div class="board">
        <Leaderboard/>
      </div>
      </div>   
    </div>
  );
}

export default App;