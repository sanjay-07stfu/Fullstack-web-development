import React from "https://esm.sh/react@18";
import ReactDOM from "https://esm.sh/react-dom@18/client";

function Child({ calculateSum }) {
  return React.createElement(
    "div",
    null,
    React.createElement(
      "button",
      { onClick: () => calculateSum(10, 20) },
      "Add"
    )
  );
}

function App() {
  const handleAddition = (num1, num2) => {
    const sum = num1 + num2;
    alert(
      "First Number: " +
        num1 +
        "\nSecond Number: " +
        num2 +
        "\nAddition: " +
        sum
    );
  };

  return React.createElement(
    "div",
    null,
    React.createElement("h2", null, "Addition Using Function Prop"),
    React.createElement(Child, { calculateSum: handleAddition })
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(React.createElement(App));
