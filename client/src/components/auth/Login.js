import React, { Component } from "react";
import { connect } from "react-redux";
import classnames from "classnames";

class Login extends Component {
  state = {
    email: "",
    password: "",
    errors: {}
  };

  render() {
    const { email, password, errors } = this.state;

    return (
      <div className="container my-3">
        <div className="row">
          <div className="col-md-6 mx-auto">
            <div className="card">
              <div className="card-header">Sign-in</div>
              <div className="card-body">
                <form onSubmit={this.onSubmitHandler}>
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
                  <button className="btn btn-success">Sign-in</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
