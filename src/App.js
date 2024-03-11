import { useState } from "react";

function MinutesToHours() {
  const [amount, setAmount] = useState();
  const [inverted, setInverted] = useState(false);
  const onChange = (event) => {
    setAmount(event.target.value);
  };
  const reset = () => setAmount(0);
  const onInvert = () => {
    setInverted((current) => !current);
    reset();
  };
  return (
    <div>
      <div>
        <h3>Minu 2 H</h3>
        <label htmlFor="minutes">Minutes</label>
        <input
          id="minutes"
          placeholder="Minutes"
          value={inverted ? amount * 60 : amount}
          type="number"
          onChange={onChange}
          disabled={inverted}
        />
        <label htmlFor="hours">Hours</label>
        <input
          id="hours"
          placeholder="Hours"
          value={inverted ? amount : Math.round(amount / 60)}
          type="number"
          onChange={onChange}
          disabled={!inverted}
        />
      </div>
      <button onClick={reset}>Reset</button>
      <button onClick={onInvert}>{inverted ? "Turn back" : "Invert"}</button>
    </div>
  );
}

function KmToMiles() {
  const [amount, setAmount] = useState();
  const [inverted, setInverted] = useState(false);
  const onChange = (event) => setAmount(event.target.value);
  const reset = () => setAmount(0);
  const onInvert = () => {
    setInverted((current) => !current);
    reset();
  };
  return (
    <div>
      <h3>Km 2 M</h3>
      <div>
        <label htmlFor="km">Km</label>
        <input
          id="km"
          type="number"
          placeholder="Km"
          value={inverted ? amount * 1.6 : amount}
          onChange={onChange}
          disabled={inverted}
        ></input>
        <label htmlFor="mile">Mile</label>
        <input
          id="mile"
          type="number"
          placeholder="Mile"
          value={inverted ? amount : amount * 0.621}
          disabled={!inverted}
          onChange={onChange}
        ></input>
      </div>
      <button onClick={reset}>reset</button>
      <button onClick={onInvert}>{inverted ? "Turn back" : "Invert"}</button>
    </div>
  );
}

function App() {
  const [index, setIndex] = useState("xx");
  const onSelect = (event) => {
    setIndex(event.target.value);
  };
  return (
    <div>
      <h1>Super Converter </h1>
      <select onChange={onSelect} value="xx">
        <option value="xx">Select your units</option>
        <option value="0">Minutes & Hours</option>
        <option value="1">Km & Miles</option>
      </select>
      {index === "0" ? <MinutesToHours /> : null}
      {index === "1" ? <KmToMiles /> : null}
    </div>
  );
}

export default App;
