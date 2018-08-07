import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import classnames from "classnames";

class Login extends Component {
  state = {
    email: "",
    password: "",
    errors: {}
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmitHandler = e => {
    e.preventDefault();

    // validation
    if (this.state.email === "") {
      this.setState({ errors: { email: "Email is required" } });
      return;
    }
    if (this.state.password === "") {
      this.setState({ errors: { password: "Password is required" } });
      return;
    }

    const userData = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.loginUser(userData);
  };

  render() {
    const { email, password, errors } = this.state;

    return (
      <div className="container my-3">
        <div className="row">
          <div className="col-lg-4 col-md-6 mx-auto">
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

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
  // errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);
