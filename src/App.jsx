import { useState } from "react";

const App = () => {
  const [inc, setInc] = useState(0);

  function increaseValue() {
    setInc((prevCounter) => prevCounter + 1);
    setInc((prevCounter) => prevCounter + 1);
    setInc((prevCounter) => prevCounter + 1);
    setInc((prevCounter) => prevCounter + 1);
  }

  function decreaseValue() {
    setInc(inc - 1);
  }

  return (
    <div className="text-4xl flex flex-col gap-3 items-center justify-center ">
      {inc}
      <button
        onClick={increaseValue}
        className="bg-red-800 border p-4 rounded-xl"
      >
        increment
      </button>
      <button onClick={decreaseValue} className="bg-blue-700 border">
        decrement
      </button>
    </div>
  );
};

export default App;
