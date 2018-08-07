import React, { Component } from "react";
import classnames from "classnames";

class Register extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    password2: "",
    errors: {}
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmitHandler = e => {
    e.preventDefault();

    // validation
    if (this.state.name === "") {
      this.setState({ errors: { name: "Name is required" } });
      return;
    }
    if (this.state.email === "") {
      this.setState({ errors: { email: "Email is required" } });
      return;
    }
    if (this.state.password === "") {
      this.setState({ errors: { password: "Password is required" } });
      return;
    }
    if (this.state.password2 != this.state.password) {
      this.setState({
        errors: { password2: "Confirm password does not match" }
      });
      return;
    }

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password
    };

    this.props.registerUser(newUser);

    this.setState({
      name: "",
      email: "",
      password: "",
      password2: "",
      errors: {}
    });

    // redirect
    this.props.history.push("/login");
  };

  render() {
    const { name, email, password, password2, errors } = this.state;

    return (
      <div className="container my-3">
        <div className="row">
          <div className="col-md-6 mx-auto">
            <div className="card">
              <div className="card-header">Sign-up</div>
              <div className="card-body">
                <form onSubmit={this.onSubmitHandler}>
                  {/* Name */}
                  <div className="form-group">
                    <input
                      type="text"
                      name="name"
                      placeholder="Your complete name"
                      className={classnames("form-control", {
                        "is-invalid": errors.name
                      })}
                      value={name}
                      onChange={this.onChange}
                    />
                    {errors && (
                      <div className="invalid-feedback">{errors.name}</div>
                    )}
                  </div>
                  {/* Email */}
                  <div className="form-group">
                    <input
                      type="text"
                      name="email"
                      placeholder="Your email"
                      className={classnames("form-control", {
                        "is-invalid": errors.email
                      })}
                      value={email}
                      onChange={this.onChange}
                    />
                    {errors && (
                      <div className="invalid-feedback">{errors.email}</div>
                    )}
                  </div>
                  {/* password */}
                  <div className="form-group">
                    <input
                      type="text"
                      name="password"
                      placeholder="Your password"
                      className={classnames("form-control", {
                        "is-invalid": errors.password
                      })}
                      value={password}
                      onChange={this.onChange}
                    />
                    {errors && (
                      <div className="invalid-feedback">{errors.password}</div>
                    )}
                  </div>
                  {/* password2 */}
                  <div className="form-group">
                    <input
                      type="text"
                      name="password2"
                      placeholder="Confirm password"
                      className={classnames("form-control", {
                        "is-invalid": errors.password2
                      })}
                      value={password2}
                      onChange={this.onChange}
                    />
                    {errors && (
                      <div className="invalid-feedback">{errors.password2}</div>
                    )}
                  </div>
                  <button className="btn btn-success">Sign-up</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
