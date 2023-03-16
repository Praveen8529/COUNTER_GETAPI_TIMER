import "./styles.css";
import { useEffect, useState, useRef } from "react";
import { Routes, Route, BrowserRouter as Router, Link } from "react-router-dom";
import Fetch from "./Fetch";

const generate = () => {
  var m = Math.random();
  return m.toString()[3];
};
export default function App() {
  return (
    <>
      <Router>
        <div className="App">
          <Link to={"/counter"}>HOME</Link>
          <Link to={"/Fetch"}>GET API</Link>
        </div>

        <Routes>
          <Route path="/counter" element={<Counter />} />
          <Route path="/Fetch" element={<Fetch id={generate()} />} />
        </Routes>
      </Router>
    </>
  );
}

const Counter = () => {
  const [data, setData] = useState("IDEAL");

  const [startTime, setStartTime] = useState(0);
  const IntervalIDRef = useRef(null);

  const generate_ran = () => {
    var m = Math.random();
    return m.toString()[3];
  };

  const start = () => {
    console.log(IntervalIDRef.current);
    if (!IntervalIDRef.current) {
      IntervalIDRef.current = setInterval(() => {
        setStartTime((prev) => prev + 1);
      }, 500);
    }
    var LL = () => {
      setData("STARTED");
      return setTimeout(() => {
        return new Promise((res, rej) => {
          if (generate_ran() > 5) setData("SUCCESS");
          else setData("FAILUR");
        });
      }, 1000);
    };
    LL();
  };
  const stop = () => {
    clearInterval(IntervalIDRef.current);
    IntervalIDRef.current = null;
  };

  useEffect(() => {
    return () => {
      clearInterval(IntervalIDRef.current);
    };
  }, []);

  return (
    <>
      <div className="component">
        <div>
          <span>{data} </span>
          <span>
            <strong>{startTime}</strong>
          </span>
        </div>
        <div>
          <button id="btnStart" onClick={start}>
            Start
          </button>
          <button id="btnStop" onClick={stop}>
            Stop
          </button>
        </div>
      </div>
    </>
  );
};
