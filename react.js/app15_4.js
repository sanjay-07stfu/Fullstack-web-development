import React, { useState, useEffect } from "https://esm.sh/react@18";
import ReactDOM from "https://esm.sh/react-dom@18/client";

// Child Component - demonstrates lifecycle with useEffect
function Counter({ count }) {
  useEffect(() => {
    console.log("Child: Component Mounted or Updated");
    return () => {
      console.log("Child: Component will Unmount");
    };
  }, [count]);

  useEffect(() => {
    console.log("Child: Component Mounted (Runs Once)");
    return () => {
      console.log("Child: Cleanup on Unmount");
    };
  }, []);

  return React.createElement(
    "div",
    { style: { border: "2px solid blue", padding: "15px", margin: "10px" } },
    React.createElement("h3", null, "Child Component - Counter Display"),
    React.createElement("p", null, `Count Value: ${count}`),
    React.createElement("p", null, "Check console to see lifecycle logs")
  );
}

// Parent Component - demonstrates full lifecycle
function App() {
  const [count, setCount] = useState(0);
  const [showChild, setShowChild] = useState(true);
  const [log, setLog] = useState([]);

  // Runs on every render (Mounting and Updating)
  useEffect(() => {
    const newLog = [...log, `Render occurred at ${new Date().toLocaleTimeString()}`];
    setLog(newLog);
    console.log("App: Component Rendered");
  });

  // Runs only once on mount (Mounting phase)
  useEffect(() => {
    console.log("App: Component Mounted (Initialize)");
    return () => {
      console.log("App: Component Unmounting (Cleanup)");
    };
  }, []);

  // Runs when count changes (Updating phase)
  useEffect(() => {
    console.log(`App: Count Updated to ${count}`);
  }, [count]);

  return React.createElement(
    "div",
    { style: { textAlign: "center", padding: "20px", fontFamily: "Arial" } },
    React.createElement("h1", null, "React Component Lifecycle Demo"),
    React.createElement("p", null, "[Open Browser Console to see lifecycle logs]"),

    React.createElement(
      "div",
      { style: { marginBottom: "20px" } },
      React.createElement("h2", null, `Current Count: ${count}`),
      React.createElement(
        "button",
        {
          onClick: () => setCount(count + 1),
          style: { padding: "10px 20px", fontSize: "16px", margin: "5px", cursor: "pointer" }
        },
        "Increment Count"
      ),
      React.createElement(
        "button",
        {
          onClick: () => setCount(count - 1),
          style: { padding: "10px 20px", fontSize: "16px", margin: "5px", cursor: "pointer" }
        },
        "Decrement Count"
      )
    ),

    React.createElement(
      "div",
      { style: { marginBottom: "20px" } },
      React.createElement(
        "button",
        {
          onClick: () => setShowChild(!showChild),
          style: {
            padding: "10px 20px",
            fontSize: "16px",
            margin: "5px",
            backgroundColor: showChild ? "green" : "red",
            color: "white",
            cursor: "pointer"
          }
        },
        showChild ? "Unmount Child" : "Mount Child"
      )
    ),

    showChild && React.createElement(Counter, { count }),

    React.createElement(
      "div",
      {
        style: {
          marginTop: "20px",
          backgroundColor: "#f0f0f0",
          padding: "15px",
          borderRadius: "5px",
          maxHeight: "200px",
          overflowY: "auto"
        }
      },
      React.createElement("h3", null, "Render Log:"),
      log.map((entry, index) =>
        React.createElement("p", { key: index, style: { fontSize: "12px" } }, entry)
      )
    ),

    React.createElement(
      "div",
      { style: { marginTop: "20px", backgroundColor: "#fffacd", padding: "15px", borderRadius: "5px" } },
      React.createElement("h3", null, "Lifecycle Phases:"),
      React.createElement("p", null, "1. MOUNTING: Component created and inserted into DOM"),
      React.createElement("p", null, "2. UPDATING: Component re-renders due to props/state changes"),
      React.createElement("p", null, "3. UNMOUNTING: Component removed from DOM (Cleanup)")
    )
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(React.createElement(App));
