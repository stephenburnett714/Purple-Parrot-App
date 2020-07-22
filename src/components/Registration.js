import React, { Component } from "react";
import axios from "axios";

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
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={this.state.email}
            onChange={this.handleChange}
            required
          />
          <br />
          <input
            type="user_name"
            name="user_name"
            placeholder="User Name"
            value={this.state.user_name}
            onChange={this.handleChange}
            required
          />
          <br />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={this.state.password}
            onChange={this.handleChange}
            required
          />
          <br />
          <input
            type="password"
            name="password_confirmation"
            placeholder="Password Confirmation"
            value={this.state.password_confirmation}
            onChange={this.handleChange}
            required
          />
          <br />
          <button type="submit">Register</button>
        </form>
      </div>
    );
  }
}