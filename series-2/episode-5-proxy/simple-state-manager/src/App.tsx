import React from "react";

import { createObservable, useObservable } from "./useObservable";

const globalState = createObservable({
  count: 0,
});

function Counter() {
  const counter = useObservable(globalState);
  return (
    <div>
      <div>Count = {counter.count}</div>
      <button onClick={() => (counter.count += 1)}>Add One</button>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <Counter />
      <Counter />
      <Counter />
      <Counter />
      <Counter />
    </div>
  );
}

export default App;
