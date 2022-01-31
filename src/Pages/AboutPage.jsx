import { Link } from "react-router-dom";
import Card from "../shared/Card";

function AboutPage() {
  return (
    <Card>
      <div className="About">
        <h1>About This Project</h1>
        <p>This is a React app to leave feedback for a product or service</p>
        <p>Version:1.0.0</p>
        <p>
          <Link to="/">Home</Link>
        </p>
      </div>
    </Card>
  );
}

export default AboutPage;
