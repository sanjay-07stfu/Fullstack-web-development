import React from "react";
import "./App.css";
import { Bookmark } from "lucide-react";
import Card from "./components/card";

function App() {
  return ( 
    <div className="parent">
      <Card />
      <Card />
      <Card />
      <Card />
    </div>
  );
}

export default App;
