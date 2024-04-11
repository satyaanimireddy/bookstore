import React from "react";
import { Link } from "react-router-dom";

function Goback() {
  //   const navigate = useNavigate();
  return (
    <Link to="/">
      <button className="btn btn-primary">Go Back</button>
    </Link>
  );
}

export default Goback;
