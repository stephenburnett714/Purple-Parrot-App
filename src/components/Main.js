import React from "react";

const Main= (props) => {
  return (
    <div className="pt-12">
      <div>
        <div>Dashboard</div>
        <div>Status: {props.loggedInStatus}</div>
        <div>User: {props.user.user_name}</div>
      </div>
    </div>
  );
};

export default Main;