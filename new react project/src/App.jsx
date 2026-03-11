// import React, { useState } from "react";
// import ReactDOM from "react-dom/client";
// function UserInput() {
//  // State to store user input
//  const [name, setName] = useState("");
//  return (
//  <div style={{ textAlign: "center", marginTop: "50px" }}>
//  <h2>React User Input Example</h2>
//  <input
//  type="text"
//  placeholder="Enter your name"
//  value={name}
//  onChange={(e) => setName(e.target.value)}
//  />
//  <h3>Hello {name}</h3>
//  </div>
//  );
// }
// export default UserInput;


// import React, { useState } from "react";
// import ReactDOM from "react-dom/client";
// function RegistrationForm() {
//  const [name, setName] = useState("");
//  const [email, setEmail] = useState("");
//  const [password, setPassword] = useState("");
//  const handleSubmit = (event) => {
//  event.preventDefault();
//  alert("Registration Successful!");
//  console.log("Name:", name);
//  console.log("Email:", email);
//  console.log("Password:", password);
//  // Clear the input fields
//  setName("");
//  setEmail("");
//  setPassword("");
//  };
//  return (
//  <div style={{backgroundColor: "lightgray", textAlign: "center", marginTop: "40px",padding:"2px" }}>
//  <h2 style={{backgroundColor:"pink"}}>Registration Form</h2>
//  <form onSubmit={handleSubmit}>
//  <div>
//  <label>Name: </label>
//  <input
//  type="text"
//  value={name}
//  onChange={(e) => setName(e.target.value)}
//  required
//  />
//  </div>
//  <br />
//  <div>
//  <label>Email: </label>
//  <input
//  type="email"
//  value={email}
//  onChange={(e) => setEmail(e.target.value)}
//  required
//  />
//  </div>
//  <br />
//  <div>
//  <label>Password: </label>
//  <input
//  type="password"
//  value={password}
//  onChange={(e) => setPassword(e.target.value)}
//  required
//  />
//  </div>
//  <br />
//  <button type="submit">Register</button>
//  </form>
//  </div>
//  );
// }
// export default RegistrationForm;

// import React, { useState } from "react";
// import ReactDOM from "react-dom/client";
// function RegistrationForm() {
//  const [userData, setUserData] = useState({
//  name: "",
//  email: "",
//  password: ""
//  });
//  const handleSubmit = (event) => {
//  event.preventDefault();
//  console.log(userData);
//  alert("Form Submitted Successfully");
//  // Clear the form
//  setUserData({
//  name: "",
//  email: "",
//  password: ""
//  });
//  };
//  return (
//  <div style={{ textAlign: "center", marginTop: "40px" }}>
//  <h2>Registration Form</h2>
//  <form onSubmit={handleSubmit}>
//  <div>
//  <label>Name: </label>
//  <input
//  type="text"
//  value={userData.name}
//  onChange={(e) =>
//  setUserData({ ...userData, name: e.target.value })
//  }
//  />
//  </div>
//  <br />
//  <div>
//  <label>Email: </label>
//  <input
//  type="email"
//  value={userData.email}
//  onChange={(e) =>
//  setUserData({ ...userData, email: e.target.value })
//  }
//  />
//  </div>
//  <br />
//  <div>
//  <label>Password: </label>
//  <input
//  type="password"
//  value={userData.password}
//  onChange={(e) =>
//  setUserData({ ...userData, password: e.target.value })
//  }
//  />
//  </div>
//  <br />
//  <button type="submit">Submit</button>
//  </form>
//  </div>
//  );
// }
// export default RegistrationForm;

import React, { useState } from "react";

function Cart() {

  const [cart, setCart] = useState({
    pen: 1,
    notebook: 2
  });

  const addPen = () => {
    setCart({
      ...cart,
      pen: cart.pen + 1
    });
  };
  const addNotebook = () => {
    setCart({
      ...cart,
      notebook: cart.notebook + 1
    });
  };

  return (
    <div>
      <h3>Pens: {cart.pen}</h3>
      <h3>Notebooks: {cart.notebook}</h3>

      <button onClick={addPen}>Add Pen</button>
      <button onClick={addNotebook}>Add Notebook</button>
    </div>
  );
}

export default Cart;