import React, { Component } from 'react';
import autoBind from 'react-autobind';
import auth from '../../lib/authentication';
import toastr from 'toastr';
import { Redirect } from 'react-router-dom';
import {
  Grid,
  Row,
  Col,
  FormGroup,
  ControlLabel,
  FormControl,
  Button
} from 'react-bootstrap';
import './style.css';

class Login extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {
      email: '',
      password: '',
      redirect: null,
    };
  }

  getValidationState() {
    // const length = this.state.value.length;
    // if (length > 10) return 'success';
    // else if (length > 5) return 'warning';
    // else if (length > 0) return 'error';
    return null;
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    const { email, password } = this.state;
    event.preventDefault();
    auth.authenticate({
      email,
      password,
      strategy: 'local'
    })
    .then(response => {
      console.log({ response })
      this.setState({
        redirect: '/dashboard'
      })
    })
    .catch(err => {
      console.log({ err })
      toastr.error(err.message)
    })
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }
    return (
      <div className="Login">
        <Grid>
          <Row>
            <Col xs={6} xsOffset={3}>
              <form onSubmit={this.handleSubmit}>
                <FormGroup
                  controlId="email"
                  validationState={this.getValidationState()}
                >
                  <ControlLabel>Email</ControlLabel>
                  <FormControl
                    name="email"
                    type="text"
                    value={this.state.email}
                    onChange={this.handleChange}
                  />
                  <FormControl.Feedback />
                </FormGroup>
                <FormGroup
                  controlId="password"
                  validationState={this.getValidationState()}
                >
                  <ControlLabel>Password</ControlLabel>
                  <FormControl
                    name="password"
                    type="password"
                    value={this.state.password}
                    onChange={this.handleChange}
                  />
                  <FormControl.Feedback />
                </FormGroup>
                <Button type="submit">Login</Button>
              </form>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
  // render() {
  //   return (
  //     <div className="Login">
  //       <Grid>
  //         <Row>
  //           <Col xs={6} xsOffset={3}>
  //             <h1>Login</h1>
  //           </Col>
  //         </Row>
  //       </Grid>
  //     </div>
  //   );
  // }
}

export default Login;