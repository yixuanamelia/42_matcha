import React from "react";

// Import service
import signinUser from './Signin.service';

class Login extends React.Component {
  // Like in Signin add state for the needed variables : username/email + password
  constructor(props) {
    super(props);

    this.state = {
      usernameOrEmail: "",
      password: "",
    }

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // Get the use input
  handlChange(event) {

    let name = event.target.name;
    let value = event.target.value;
    this.setState({
      [name]: value
    })
  }


  async handleSubmit(e) {
    e.preventDefault();
    let data = {
      usernameOrEmail: this.state.usernameOrEmail,
      password: this.state.password
    }

    
    // Sumbit/post to server
    let response = await signinUser(data);
    
  }

  // Create a funciton for validation like in signin
  // Password and email are valid


  // Create a submit function like in signin
  // post the information

  // Create a service file like in Signin
  // in the login.service make an axios call to /users/login and send the needed data


  render() {
    return (
      <div className="limiter">
        <div className="container-login100">
          <div className="login100-more"></div>

          <div className="wrap-login100 p-l-50 p-r-50 p-t-72 p-b-50">
            <form className="login100-form validate-form">
              <span className="login100-form-title p-b-59">
                Log in
					    </span>
              <div className="wrap-input100 validate-input" data-validate="Username is required">
                <span className="label-input100">Username</span>
                <input className="input100" type="text" name="usernameOrEmail" onChange={(event) => this.handlChange(event)} placeholder="Input your username or email" />
                <span className="focus-input100"></span>
              </div>

              <div className="wrap-input100 validate-input" data-validate="Password is required">
                <span className="label-input100">Password</span>
                <input className="input100" type="text" name="password" onChange={(event) => this.handlChange(event)} placeholder="*************" />
                <span className="focus-input100"></span>
              </div>

              <div className="flex-m w-full p-b-33">
                <div className="contact100-form-checkbox">
                  <input className="input-checkbox100" id="ckb1" type="checkbox" name="remember-me" />
                  <div className="flex-m w-full p-b-33">
                    {/* <div className="contact100-form-checkbox">
                      <label className="label-checkbox100" for="ckb1">
                        <span className="txt1">
                          Remember Me
                    </span>
                      </label>

                    </div> */}

                  </div>
                  <div className="container-login100-form-btn">
                    <div className="wrap-login100-form-btn">
                      <div className="login100-form-bgbtn"></div>
                      <button onClick={(e) => this.handleSubmit(e)} className="login100-form-btn">
                        Sign In
							</button>
                    </div>
                    <a href="/forgotPass" className="txt2 hov1">
                      Forgot Password?
									</a>
                  </div>
                </div>
              </div>


            </form>
          </div>
        </div>
      </div>
    );
  }
};

export default Login;