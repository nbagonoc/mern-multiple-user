import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class Sidebar extends Component {
  render() {
    const { user } = this.props.auth;

    return (
      <div className="sticky-top">
        {/* moderator lvl */}
        {user.role === "moderator" || user.role === "admin" ? (
          <div className="list-group">
            <Link
              className="list-group-item list-group-item-action"
              to="/dashboard"
            >
              Dashboard
            </Link>
            <Link
              className="list-group-item list-group-item-action"
              to="/moderator"
            >
              Moderator Page
            </Link>
            {/* Admin lvl only*/}
            {user.role === "admin" ? (
              <Link
                className="list-group-item list-group-item-action"
                to="/admin"
              >
                Admin Page
              </Link>
            ) : null}
          </div>
        ) : (
          <div className="list-group">
            {/* user lvl */}
            <Link
              className="list-group-item list-group-item-action"
              to="/dashboard"
            >
              Dashboard
            </Link>
          </div>
        )}
      </div>
    );
  }
}

Sidebar.proptypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Sidebar);
