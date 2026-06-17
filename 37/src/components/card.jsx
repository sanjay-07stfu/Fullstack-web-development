import react from "react";
import { Bookmark } from "lucide-react";

const Card = () => {
    return (
        <div className="parent">
            <div className="card">
                <div className="top">
                    <img className="logo1" src="https://tse3.mm.bing.net/th/id/OIP.YKFZjzosPzcUtBNHe9cAdAHaEK?r=0&rs=1&pid=ImgDetMain&o=7&rm=3" alt="Amazon" />
                    <button>Save <Bookmark size={12} /></button>
                </div>

                <div className="center">
                    <h3 ><bold>Amazon <span>5 days ago</span></bold></h3>

                    <h2>Senior UI/UX Designer</h2>
                    <div className="button-02">
                        <button>Part-Time</button> <button>Senior Level</button>
                    </div>
                </div>
                <div className="line">
                </div>
                <div className="footer">
                    <span>$120/hr</span>
                    <p>Mumbai,india</p>
                    <button>Apply Now</button>


                </div>

            </div>

        </div>

    )

}

export default Card;