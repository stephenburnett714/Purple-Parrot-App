import React from "react";
import Burger from "./Burger";
import pplogo from "../Images/pplogo.png";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <div
    className="flex flex-row align-items-center bg-black p-4 justify-between fixed w-screen"
      id="navbar"
    >
      
      <div className="lg:pl-32">
        <NavLink exact to={"/"}>
          <img className="h-12 w-12" src={pplogo} alt="logo" />
        </NavLink>
      </div>

      <div className="flex align-items-center hidden xl:flex xl:flex-row lg:flex lg:flex-row lg:pr-32">
        <div>
          <NavLink className="text-gray-400 pr-20" exact to={"/events"}>
            Events
          </NavLink>
        </div>

        <div>
          <NavLink className="text-gray-400 pr-20" exact to={"/work"}>
            Work
          </NavLink>
        </div>

        <div>
          <NavLink className="text-gray-400 pr-20" exact to={"/profile"}>
            Profile
          </NavLink>
        </div>

        <div>
          <NavLink exact to={"/"}>
            <button className="call-color p-1 rounded-md text-white">
              Book a call
            </button>
          </NavLink>
        </div>
      </div>
      <div className="lg:hidden flex align-items-center">
      <Burger />
      </div>
    </div>
  );
}
