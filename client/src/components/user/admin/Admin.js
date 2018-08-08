import React, { Component } from "react";
import Sidebar from "../../layouts/Sidebar";

class Admin extends Component {
  render() {
    return (
      <div className="container my-3">
        <div className="row">
          <div className="col-md-3 mb-3">
            <Sidebar />
          </div>
          <div className="col-md-9 pl-md-0">
            <div className="card">
              <div className="card-header">Welcome to the admin page</div>
              <div className="card-body">
                Only the Adminstrator can access this page
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Admin;
