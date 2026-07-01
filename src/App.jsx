import "./App.css";
import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  function onButtonClick() {
    setCount(count + 1);
  }
  // function onButtonClick() {
  //   const button = document.getElementById("btn").innerHTML;
  //   const value = button.split(" ")[2];
  //   console.log(value);
  //   const increaseValue = parseInt(value) + 1;
  //   document.getElementById("btn").innerHTML = `Counter is ${increaseValue}`;
  // }
  return (
    <>
      <button
        id="btn"
        type="button"
        className="counter"
        onClick={onButtonClick}
      >
        Count is {count}
      </button>
    </>
  );
}

export default App;
