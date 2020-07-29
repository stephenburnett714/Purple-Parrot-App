import React, { Component } from "react"
import axios from "axios";
import { Redirect, NavLink } from 'react-router-dom';

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      loginErrors: "",
      redirect: false,
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
    const { email, password } = this.state;

    axios
      .post(
        "http://localhost:3001/sessions",
        {
          user: {
            email: email,
            password: password
          }
        },
        { withCredentials: true }
      )
      .then(response => {
          console.log("res from login", response)
        if (response.data.logged_in) {
          this.props.handleSuccessfulAuth(response.data);
          console.log(this.props.user)
        }
      })
      .catch(error => {
        console.log("login error", error);
      });
    event.preventDefault();
  }
  
  render() {
    
    return (

      <div className="w-full h-full flex items-center justify-center flex-col">
        { this.props.loggedInStatus === "LOGGED_IN" ? (<Redirect push to="/main"/>) : null }
        <div className="text-6xl text-gray-500 pt-32 pb-32">Hello</div>
        <form className=" flex flex-col items-center"onSubmit={this.handleSubmit}>
          <input
            className="border-black border-b"
            type="email"
            name="email"
            placeholder="Email"
            value={this.state.email}
            onChange={this.handleChange}
            required
          />
          <br />
          <input
            className="border-black border-b"
            type="password"
            name="password"
            placeholder="Password"
            value={this.state.password}
            onChange={this.handleChange}
            required
          />
          <br />
          <button className="px-8 py-2 rounded bg-purple-500 text-white mt-16 mb-4 bg-opacity-50" type="submit">Sign In</button>
        </form>
        <NavLink to="/registration" className="text-gray-500 w-20">Sign Up</NavLink>
      </div>
    );
  }
}