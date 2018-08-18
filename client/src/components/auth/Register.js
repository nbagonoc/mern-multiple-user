import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
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

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };

    this.props.registerUser(newUser, this.props.history);
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  render() {
    const { name, email, password, password2, errors } = this.state;

    return (
      <div className="container my-3">
        <div className="row">
          <div className="col-lg-6 col-md-8 mx-auto">
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
                      type="password"
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
                      type="password"
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
                  <button
                    className="btn btn-success"
                    disabled={
                      !(
                        this.state.name &&
                        this.state.email &&
                        this.state.password &&
                        this.state.password2
                      )
                    }
                  >
                    Sign-up
                  </button>
                  <span className="small text-muted d-block mt-2">
                    Already have an account?
                    <Link to="/login"> Login now</Link>
                  </span>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(Register);
