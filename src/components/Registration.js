import React, { Component } from "react";
import axios from "axios";
import { Redirect, NavLink } from 'react-router-dom';

export default class Registration extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      user_name: "",
      password: "",
      password_confirmation: "",
      registrationErrors: "",
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }


    handleSubmit(event) {
      const { email, user_name, password, password_confirmation } = this.state;
  
      axios
        .post(
          "http://localhost:3001/registrations",
          {
            user: {
              user_name: user_name,
              email: email,
              password: password,
              password_confirmation: password_confirmation,
              avatar: "purple-parrot",
              score: 0,
            }
          },
          { withCredentials: true }
      )
      .then(response => {
        console.log(response)
        if (response.data.status === "created") {
          this.props.handleSuccessfulAuth(response.data);
        }
      })
      .catch(error => {
        console.log("registration error", error);
      });
    event.preventDefault();
  }

  render() {
    return (
      <div className="w-full h-full flex items-center justify-center flex-col">
        { this.props.loggedInStatus === "LOGGED_IN" ? (<Redirect push to="/main"/>) : null }
        <div className="text-6xl text-gray-500 pt-32 pb-32">Welcome</div>
        <form className="flex items-center flex-col"onSubmit={this.handleSubmit}>
          <input
          className="border-black border-b "
            type="email"
            name="email"
            placeholder="Email"
            value={this.state.email}
            onChange={this.handleChange}
            required
          />
          <br />
          <input
          className="border-black border-b mt-4"
            type="user_name"
            name="user_name"
            placeholder="User Name"
            value={this.state.user_name}
            onChange={this.handleChange}
            required
          />
          <br />
          <input
          className="border-black border-b mt-4"
            type="password"
            name="password"
            placeholder="Password"
            value={this.state.password}
            onChange={this.handleChange}
            required
          />
          <br />
          <input
          className="border-black border-b mt-4"
            type="password"
            name="password_confirmation"
            placeholder="Password Confirmation"
            value={this.state.password_confirmation}
            onChange={this.handleChange}
            required
          />
          <br />
          <button className="px-8 py-2 rounded bg-purple-500 text-white mt-16 mb-4 bg-opacity-50" type="submit">Register</button>
        </form>
        <NavLink to="/log-in" className="text-gray-500 w-20">Sign In</NavLink>
      </div>
    );
  }
}