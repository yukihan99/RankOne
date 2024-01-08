import { BrowserRouter, Routes, Route } from "react-router-dom";
import Board from "./pages/leaderboard";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Board/>}></Route>
        </Routes>
      </BrowserRouter>
    
    </div>
  );
}

export default App;