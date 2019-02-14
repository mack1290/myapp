import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import classnames from "classnames";
// import Select from 'react-select';
import AsyncSelect from 'react-select/lib/Async';
import { skillOptions } from './../../data/data';
import { countryOptions } from './../../data/data';

const filterSkills = (inputValue) => {
  return skillOptions.filter(i =>
    i.label.toLowerCase().includes(inputValue.toLowerCase())
  );
};

const filterCountry = (inputValue) => {
  return countryOptions.filter(i =>
    i.label.toLowerCase().includes(inputValue.toLowerCase())
  );
};

const loadSkillsOptions = (inputValue, callback) => {
  setTimeout(() => {
    callback(filterSkills(inputValue));
  }, 1000);
};

const loadCountryOptions = (inputValue, callback) => {
  setTimeout(() => {
    callback(filterCountry(inputValue));
  }, 1000);
};

class Register extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      password2: "",
      dob: "",
      country: '',
      skills: [], 
      errors: {}
    };
  }

  componentDidMount() {
    // If logged in and user navigates to Register page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  handleSkillStateChange = (newValueArray) => {
    const skills = [];
    newValueArray.map(skill => {
      skills.push(skill.label);
    });
    // this.setState({
    //   skills:[].slice.call(newValue).map(o => {
    //       return o.label;
    //     });
    //   });
    this.setState({ skills });
  };

  handleSkillChange = (newValue) => {
    const skills = newValue.replace(/\W/g, '');
    return skills;
  };

  handleCountryStateChange = (newValue) => {
    const country = newValue.label.replace(/\W/g, '');
    this.setState({ country });
  };
  
  handleCountryChange = (newValue) => {
    const country = newValue.replace(/\W/g, '');
    return country;
  };

  onSubmit = e => {
    e.preventDefault();

    const newUser = {
      username: this.state.username,
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2,
      dob: this.state.dob,
      country: this.state.country,
      skills: this.state.skills
    };
    this.props.registerUser(newUser, this.props.history);
  };

  render() {
    const { errors } = this.state;
    return (
      <div className="container">
        <div className="row">
          <div className="col s8 offset-s2">
            <Link to="/" className="btn-flat waves-effect">
              <i className="material-icons left">keyboard_backspace</i> Back to
              home
            </Link>
            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <h4>
                <b>Register</b> below
              </h4>
              <p className="grey-text text-darken-1">
                Already have an account? <Link to="/login">Log in</Link>
              </p>
            </div>
            <form noValidate onSubmit={this.onSubmit}>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.username}
                  error={errors.username}
                  id="username"
                  type="text"
                  className={classnames("", {
                    invalid: errors.username
                  })}
                />
                <label htmlFor="username">Username</label>
                <span className="red-text">{errors.username}</span>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.firstname}
                  error={errors.firstname}
                  id="firstname"
                  type="text"
                  className={classnames("", {
                    invalid: errors.firstname
                  })}
                />
                <label htmlFor="username">First Name</label>
                <span className="red-text">{errors.firstname}</span>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.lastname}
                  error={errors.lastname}
                  id="lastname"
                  type="text"
                  className={classnames("", {
                    invalid: errors.lastname
                  })}
                />
                <label htmlFor="lastname">Last Name</label>
                <span className="red-text">{errors.lastname}</span>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.email}
                  error={errors.email}
                  id="email"
                  type="email"
                  className={classnames("", {
                    invalid: errors.email
                  })}
                />
                <label htmlFor="email">Email</label>
                <span className="red-text">{errors.email}</span>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.dob}
                  error={errors.dob}
                  id="dob"
                  type="date"
                  className={classnames("", {
                    invalid: errors.dob
                  })}
                />
                <label htmlFor="email">Date Of Birth</label>
                <span className="red-text">{errors.dob}</span>
              </div>
              <div className="col s10">
              <label htmlFor="country">Country</label>
              <AsyncSelect
              // value={this.state.country}
              error={errors.country}
              // id="country"
              cacheOptions
              loadOptions={loadCountryOptions}
              defaultOptions
              onChange={this.handleCountryStateChange}
              onInputChange={this.handleCountryChange}
              />
              <span className="red-text">{errors.country}</span>
              </div>
              <div className="col s10">
              <label htmlFor="skills">Skills</label>
              <AsyncSelect
              // value={this.state.country}
              error={errors.country}
              // id="skills"
              isMulti
              cacheOptions
              loadOptions={loadSkillsOptions}
              defaultOptions
              onChange={this.handleSkillStateChange}
              onInputChange={this.handleSkillChange}
              />
              <span className="red-text">{errors.skills}</span>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.password}
                  error={errors.password}
                  id="password"
                  type="password"
                  className={classnames("", {
                    invalid: errors.password
                  })}
                />
                <label htmlFor="password">Password</label>
                <span className="red-text">{errors.password}</span>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.password2}
                  error={errors.password2}
                  id="password2"
                  type="password"
                  className={classnames("", {
                    invalid: errors.password2
                  })}
                />
                <label htmlFor="password2">Confirm Password</label>
                <span className="red-text">{errors.password2}</span>
              </div>

              <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                <button
                  style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem"
                  }}
                  type="submit"
                  className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                >
                  Sign up
                </button>
              </div>
            </form>
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
)(withRouter(Register));
