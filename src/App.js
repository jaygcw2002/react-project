import logo from './logo.svg';
import './App.css';
import FootballFever from './FootballFever';
import { useEffect } from 'react';
import "./FootballFever.css"

function App() {

  useEffect(
    () => {
      document.body.classList.add("main-background")
    }
  , [])

  return (
    <div className="App">
      <FootballFever />
    </div>
  );
}

export default App;
