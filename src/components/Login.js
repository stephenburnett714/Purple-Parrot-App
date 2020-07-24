import React, { Component } from "react";
import {NavLink} from "re"
import axios from "axios";



export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      redirect: false,
      loginErrors: "",
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }



  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
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
            password: password,
          },
        },
        { withCredentials: true }
      )
      .then((response) => {
        console.log("res from login", response);
        
        if (response.data.logged_in) {
          this.props.handleSuccessfulAuth(response.data);
        }
        {
          console.log(this.props.user);
        }
      })
      .catch((error) => {
        console.log("login error", error);
      });
    event.preventDefault();
  }

  
  render() {
    return (
      <div className="pt-12">
        { this.state.redirect ? (<Redirect push to="/"/>) : null }
        <form onSubmit={this.handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={this.state.email}
            onChange={this.handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={this.state.password}
            onChange={this.handleChange}
            required
          />

          <NavLink className="bg-purple-300" type="submit">
            Login
          </NavLink>
        </form>
      </div>
    );
  }
}
