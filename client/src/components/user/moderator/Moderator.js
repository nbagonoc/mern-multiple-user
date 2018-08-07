import React, { Component } from "react";
import Sidebar from "../../layouts/Sidebar";

class Moderator extends Component {
  render() {
    return (
      <div className="container my-3">
        <div className="row">
          <div className="col-md-4">
            <Sidebar />
          </div>
          <div className="col-md-8">
            <div className="card">
              <div className="card-header">Welcome to the moderator page</div>
              <div className="card-body">
                The administrator and moderator can access this page
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Moderator;
