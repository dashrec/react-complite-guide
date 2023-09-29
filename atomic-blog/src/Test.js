import { useState } from 'react';

function SlowComponent() {
  const words = Array.from({ length: 100000 }, () => 'word');

  return (
    <ul>
      {words.map((word, index) => (
        <li key={index}>
          {index}: {word}
        </li>
      ))}
    </ul>
  );
}

// children will not be effected by the state update because nothing is changed in there
// get SlowComponent as a children means
function Counter({ children }) {
  const [count, setCount] = useState(0);
  // if we would have <SlowComponent /> like this than it would rerender SlowComponent as well each time state update would occur
  return (
    <div>
      <h1>Slow counter?!?</h1>
      <button onClick={() => setCount((c) => c + 1)}>Increase: {count}</button>
      {children}
    </div>
  );
}

// when we would have state update inside this component then it would cause to rerender the whole component including SlowComponent even tough SlowComponent is not dependent to this state update
export default function Test() {
  // each time we click, it will rerender the component
  /*   const [count, setCount] = useState(0);
  return (
    <div>
      <h1>Slow counter?!?</h1>
      <button onClick={() => setCount((c) => c + 1)}>Increase: {count}</button>
      <SlowComponent />
    </div>
  ); */

  return (
    <div>
      <h1>Slow counter?!?</h1>;
      <Counter>
        <SlowComponent />
      </Counter>
    </div>
  );
}
