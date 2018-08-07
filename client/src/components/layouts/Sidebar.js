import React, { Component } from "react";
import { Link } from "react-router-dom";

class Sidebar extends Component {
  render() {
    return (
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
        <Link className="list-group-item list-group-item-action" to="/admin">
          Admin Page
        </Link>
      </div>
    );
  }
}

export default Sidebar;
