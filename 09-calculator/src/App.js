import { useState } from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <TipCalculator />
    </div>
  );
}

export default App;

function TipCalculator() {
  const [bill, setBill] = useState('');
  const [percentage, setPercentage] = useState(0);
  const [percentage2, setPercentage2] = useState(0);

  const tip = bill * ((percentage + percentage2) / 2 / 100);

  function handleReset() {
    setBill('');
    setPercentage(0);
    setPercentage2(0);
  }

  return (
    <div className="container">
      <BillInput bill={bill} setBill={setBill} />

      <SelectPercentage onSelect={setPercentage} percentage={percentage}>
        How did you like the service?
      </SelectPercentage>

      <SelectPercentage onSelect={setPercentage2} percentage={percentage2}>
        How did your friend like the service?
      </SelectPercentage>

      {bill > 0 && (
        <>
          <Output bill={bill} tip={tip} />
          <Button onReset={handleReset}>Reset</Button>
        </>
      )}
    </div>
  );
}

function SelectPercentage({ onSelect, percentage }) {
  return (
    <>
      <label>children</label>
      <select
        value={percentage}
        onChange={(e) => onSelect(Number(e.target.value))}
      >
        <option value="0">Dissatisfied(0%)</option>
        <option value="5">it was okay(5%)</option>
        <option value="10">it was good (10%)</option>
        <option value="20">Absolutely amazing! (20%)</option>
      </select>
    </>
  );
}

function BillInput({ bill, setBill }) {
  return (
    <>
      <label>How much was the bill</label>
      <input
        value={bill}
        type="text"
        placeholder="Bill Value"
        onChange={(e) => setBill(Number(e.target.value))}
      />
    </>
  );
}

function Button({ onReset, children }) {
  return <button onClick={onReset}>{children}</button>;
}

function Output({ bill, tip }) {
  return (
    <h3>
      You pay ${bill + tip} (${bill} + ${tip} tip)
    </h3>
  );
}
