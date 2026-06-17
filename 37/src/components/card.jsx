import react from "react";
import { Bookmark } from "lucide-react";

const Card = (props) => {
    return (
        <div className="parent">
            <div className="card">
                <div className="top">
                    <img className="logo1" src={props.brandLogo} alt="logo" />
                    <button>Save <Bookmark size={12} /></button>
                </div>

                <div className="center">
                    <h3 ><bold>{props.companyName} <span>{props.datePosted}</span></bold></h3>

                    <h2>{props.post}</h2>
                    <div className="button-02">
                        <button>{props.tag1}</button> <button>{props.tag2}</button>
                    </div>
                </div>
                <div className="line">
                </div>
                <div className="footer">
                    <span>{props.pay}</span>
                    <p>Mumbai,india</p>
                    <button>Apply Now</button>


                </div>

            </div>

        </div>

    )

}

export default Card;