
import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

class Form extends Component {
    state = {
        firstName: "",
        firstNameError: "",
        lastName: "",
        lastNameError: "",
        email: "",
        emailError: "",
        password: "",
        passwordError: ""
    };

  change = ({target: {name, value}}) => {
    this.setState({
      [name]: value
    });
  };

  validate = () => {
    let err = false;
    const errors = {
        firstNameError: "",
        lastNameError: "",
        emailError: "",
        passwordError: ""
    };
    const validateEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (this.state.firstName.trim().length === 0) {
      err = true;
      errors.firstNameError = "First Name is required"
    }

    if (this.state.lastName.trim().length === 0) {
      err = true;
      errors.lastNameError = "Last Name is required"
    }

    if (this.state.email.trim().length === 0) {
      err = true;
      errors.emailError = "Email is required"
    }

    if (this.state.password.trim().length === 0) {
      err = true;
      errors.passwordError = "Password is required"
    }
    
    if (this.state.firstName.length < 5 && this.state.firstName.trim().length !== 0) {
      err = true;
      errors.firstNameError = "Minimum 5 characters";
    }
    
    if (this.state.lastName.length < 5 && this.state.lastName.trim().length !== 0) {
      err = true;
      errors.lastNameError = "Minimum 5 characters";
    }

    if (!validateEmail.test(this.state.email) && this.state.email.trim().length !== 0) {
      err = true;
      errors.emailError = "Email is not valid";
    }

    if (this.state.password.length < 6 && this.state.password.trim().length !== 0) {
      err = true;
      errors.passwordError = "Minimum 6 characters"
    }

    this.setState(errors);
    
    return err;
  }

  onSubmit = e => {
    e.preventDefault();
    const isError = this.validate();

    if (!isError) {
      this.props.onSubmit(this.state);
      this.setState({
        firstName: "",
        lastName: "",
        lastNameError: "",
        firstNameError: "",
        email: "",
        emailError: "",
        password: "",
        passwordError: ""
      });
    }
  };

  render() {
    const { firstName, lastName, email, password, 
            firstNameError, lastNameError, emailError, passwordError } = this.state;

    return (
      <form>
        <TextField
          name="firstName"
          floatingLabelText="First Name"
          floatingLabelFixed
          value={firstName}
          onChange={e => this.change(e)}
          errorText={firstNameError}
        />
        <br />
        <TextField
          name="lastName"
          floatingLabelText="Last Name"
          floatingLabelFixed
          value={lastName}
          onChange={e => this.change(e)}
          errorText={lastNameError}
        />
        <br />
        <TextField
          name="email"
          hintText="example@test.com"
          floatingLabelText="Email"
          floatingLabelFixed
          value={email}
          onChange={e => this.change(e)}
          errorText={emailError}
        />
        <br />
        <TextField
          type="password"
          name="password"
          floatingLabelText="Password"
          floatingLabelFixed
          value={password}
          onChange={e => this.change(e)}
          errorText={passwordError}
        />
        <br />
        <RaisedButton 
            style={{marginTop: 20}}
            primary={true}
            onClick={e => this.onSubmit(e)}
            label="Submit"
          />
      </form>
    );
  }
}

export default Form;