import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
const moment = require('moment');

class Dashboard extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {
    const { user } = this.props.auth;
    console.log(this.props.auth);
    return (
      <div style={{ height: "75vh" }} className="container valign-wrapper">
        <div className="row">
        <div className="col s12">
          <div className="landing-copy col s12 center-align">
              <b>Hey there,</b> {user.firstname}
              <p className="flow-text grey-text text-darken-1">
                You are logged into our App{" "}
                <span style={{ fontFamily: "monospace" }}>Your Profile looks like this!!</span> </p>  
          </div>
          </div>      
            <div className="col s12">
            <label htmlFor="username">Username</label>
                <input
                  value={user.username}
                  id="username"
                  type="text"
                  disabled
                  class="validate"
                />
            </div>
            <div className="col s12">
            <label htmlFor="firstname">Firstname</label>
                <input
                  value={user.firstname}
                  id="firstname"
                  type="text"
                  disabled
                  class="validate"
                />
            </div>
            <div className="col s12">
            <label>Lastname</label>
                <input
                  value={user.lastname}
                  id="lastname"
                  type="text"
                  disabled
                  class="validate"
                />
            </div>
            <div className="col s12">
            <label htmlFor="email">Email</label>
                <input
                  value={user.email}
                  id="email"
                  type="text"
                  disabled
                  class="validate"
                />
            </div>
            <div className="col s12">
            <label htmlFor="dob">DOB</label>
                <input
                  value={moment(user.dob).format('DD/MM/YYYY')}
                  id="dob"
                  type="text"
                  disabled
                  class="validate"
                />
            </div>
            <div className="s12">
            <label htmlFor="country">Country</label>
                <input
                  value={user.country}
                  id="country"
                  type="text"
                  disabled
                  class="validate"
                />
            </div>
            <div className="s12">
            <label htmlFor="skills">Skills</label>
                <input
                  value={user.skills.join(",")}
                  id="skills"
                  type="text"
                  disabled
                  class="validate"
                />
            </div>
            <button
              style={{
                width: "150px",
                borderRadius: "3px",
                letterSpacing: "1.5px",
                marginTop: "1rem"
              }}
              onClick={this.onLogoutClick}
              className="btn btn-large waves-effect waves-light hoverable blue accent-3"
            >
              Logout
            </button>
          </div>
        </div>
    );
  }
}

Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Dashboard);
