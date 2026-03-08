import React, { useState } from "https://esm.sh/react@18";
import ReactDOM from "https://esm.sh/react-dom@18/client";

function Child({ incrementCounter }) {
  return React.createElement(
    "div",
    null,
    React.createElement(
      "button",
      { onClick: incrementCounter },
      "Increase Counter"
    )
  );
}

function App() {
  const [count, setCount] = useState(0);

  const handleIncrement = () => {
    // Functional update keeps state correct across rapid clicks.
    setCount((prevCount) => prevCount + 1);
  };

  return React.createElement(
    "div",
    null,
    React.createElement("h2", null, "Counter Example (Child to Parent)"),
    React.createElement("h3", null, `Current Count: ${count}`),
    React.createElement(Child, { incrementCounter: handleIncrement })
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(React.createElement(App));
