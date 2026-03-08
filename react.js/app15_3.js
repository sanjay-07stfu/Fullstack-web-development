import React, { useState } from "https://esm.sh/react@18";
import ReactDOM from "https://esm.sh/react-dom@18/client";

// Child Component - receives a function and passes arguments to it
function Button({ label, onClickHandler, arg1, arg2 }) {
  return React.createElement(
    "button",
    {
      onClick: () => onClickHandler(arg1, arg2),
      style: { margin: "5px", padding: "10px", fontSize: "16px" }
    },
    label
  );
}

// Parent Component
function App() {
  const [result, setResult] = useState("");

  // Function that receives multiple arguments from child
  const handleOperation = (operation, value) => {
    let output = "";

    if (operation === "add") {
      output = `Addition: 15 + ${value} = ${15 + value}`;
    } else if (operation === "multiply") {
      output = `Multiplication: 15 × ${value} = ${15 * value}`;
    } else if (operation === "subtract") {
      output = `Subtraction: 15 - ${value} = ${15 - value}`;
    } else if (operation === "divide") {
      output = `Division: 15 ÷ ${value} = ${(15 / value).toFixed(2)}`;
    }

    setResult(output);
  };

  return React.createElement(
    "div",
    { style: { textAlign: "center", padding: "20px" } },
    React.createElement("h2", null, "Passing Function Arguments to React Components"),
    React.createElement("p", null, "Click a button to perform an operation with argument 5"),
    
    React.createElement(
      "div",
      { style: { marginBottom: "20px" } },
      React.createElement(Button, {
        label: "Add (+5)",
        onClickHandler: handleOperation,
        arg1: "add",
        arg2: 5
      }),
      React.createElement(Button, {
        label: "Multiply (×5)",
        onClickHandler: handleOperation,
        arg1: "multiply",
        arg2: 5
      }),
      React.createElement(Button, {
        label: "Subtract (-5)",
        onClickHandler: handleOperation,
        arg1: "subtract",
        arg2: 5
      }),
      React.createElement(Button, {
        label: "Divide (÷5)",
        onClickHandler: handleOperation,
        arg1: "divide",
        arg2: 5
      })
    ),

    React.createElement(
      "div",
      { style: { marginTop: "20px", fontSize: "18px", fontWeight: "bold", color: "green" } },
      React.createElement("p", null, result || "Select an operation above")
    )
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(React.createElement(App));
