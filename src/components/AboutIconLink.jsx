import { FaAppStore } from "react-icons/fa";
import { Link } from "react-router-dom";

function AboutIconLink() {
  return (
    <div className="about-link">
        <Link to="/about">
            <FaAppStore size={60} />
     </Link>
    </div>
  )
}

export default AboutIconLink;
