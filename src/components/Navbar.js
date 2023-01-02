import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="container flex mx-[5%] py-5">
      <Link to="/">
        <h1 className="text-xl  font-bold">User Info</h1>
      </Link>
    </div>
  );
};

export default Navbar;
