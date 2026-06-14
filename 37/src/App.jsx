import React from "react";
import "./App.css";
import {Bookmark} from "lucide-react";

function App() {
  return (
    <div className="parent">
      <div className="card">
        <div className="top">
          <img className="logo1" src="https://tse3.mm.bing.net/th/id/OIP.YKFZjzosPzcUtBNHe9cAdAHaEK?r=0&rs=1&pid=ImgDetMain&o=7&rm=3" alt="Amazon" />
          <button>Save <Bookmark size={12} /></button>
        </div>

        <div className="center">
          <h3>Amazon</h3>
          <spam>3 days ago</spam>
          <h1>Senior UI/UX Designer</h1>
          <button>Part-Time</button> <button>Senior Level</button>

        </div>
        <div className="footer">
          <div className="line"></div>
          <spam>$120/hr</spam>
          <button>Apply Now</button>
          <p>Mumbai,india</p>


        </div>

      </div>

    </div>
  );
}

export default App;
