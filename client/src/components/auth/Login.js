import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
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

    const userData = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.loginUser(userData, this.props.history);
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  render() {
    const { email, password, errors } = this.state;

    return (
      <div className="container my-3">
        <div className="row">
          <div className="col-lg-6 col-md-8 mx-auto">
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
                  <button
                    disabled={!(this.state.email && this.state.password)}
                    className="btn btn-success"
                  >
                    Sign-in
                  </button>
                  <span className="small text-muted d-block mt-2">
                    Not yet registered yet?
                    <Link to="/register"> Register now</Link>
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

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);
