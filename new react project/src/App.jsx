import React, { useState } from "react";
import ReactDOM from "react-dom/client";
function UserInput() {
 // State to store user input
 const [name, setName] = useState("");
 return (
 <div style={{ textAlign: "center", marginTop: "50px" }}>
 <h2>React User Input Example</h2>
 <input
 type="text"
 placeholder="Enter your name"
 value={name}
 onChange={(e) => setName(e.target.value)}
 />
 <h3>Hello {name}</h3>
 </div>
 );
}
export default UserInput;