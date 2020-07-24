import React from "react";
import Burger from "./Burger";
import { NavLink } from "react-router-dom";

export default function Navbar(props) {
  return (
    <div
    className="h-16 flex flex-row align-items-center bg-white p-4 justify-between fixed w-screen"
      id="navbar"
    >
      

      <div className="flex align-items-center hidden xl:flex xl:flex-row lg:flex lg:flex-row lg:pr-32">
        <div>
          <NavLink className="text-gray-400 pr-20" exact to={"/events"}>
            Events
          </NavLink>
        </div>


        <div>
          <NavLink className="text-gray-400 pr-20" exact to={"/profile"}>
            Profile
          </NavLink>
        </div>


      </div>
      <div className="lg:hidden flex align-items-center">
      <Burger />
      </div>
    </div>
  );
}
