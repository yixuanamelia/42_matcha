import React from "react";
import { ToastContainer } from 'react-toastify';
import { ResetPwdUser } from './resetPwd.service';
const customNotification = require('../utils/notification');

class ForgotPass extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: "",
    }

    this.handleChange = this.handleChange.bind(this);
    this.valdateFormData = this.valdateFormData.bind(this);
    this.handlFormSubmit = this.handlFormSubmit.bind(this);
  }

  async handlFormSubmit(e) {
    e.preventDefault();
    if (this.valdateFormData()) {
      let data = await ResetPwdUser(this.state.email);

      if (data.code === 200)
        customNotification.fireNotification("success", data.msg)
      if (data !== "" && data.code === 205)
        customNotification.fireNotification("warning", data.msg)
      if (data !== "" && data.code === 500)
        customNotification.fireNotification("error", data.msg)
    }
  }

  valdateFormData() {
    let validateEmail = new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g);
    if (!validateEmail.test(this.state.email)) {
      customNotification.fireNotification("warning", "Email not valid")
      return false;
    }
    return true;
  }


  handleChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }


  render() {
    return (
      <div className="limiter">
        <ToastContainer />
        <div className="container-login100">
          <div className="login100-more"></div>

          <div className="wrap-login100 p-l-50 p-r-50 p-t-72 p-b-50">
            <form className="login100-form validate-form">
              <span className="login100-form-title p-b-59">
                Forgot Password?
					    </span>
              <p>You can reset your password here.
              </p>

              <div className="wrap-input100 validate-input" data-validate="Password is required">
                <input className="input100" type="text" name="email" onChange={this.handleChange} placeholder="email adress" />
                <span className="focus-input100"></span>
              </div>


              <div className="flex-m w-full p-b-33">
                <div className="container-login100-form-btn">
                  <div className="wrap-login100-form-btn">
                    <div className="login100-form-bgbtn"></div>
                    <button onClick={(e) => {this.handlFormSubmit(e)}} type="submit" className="login100-form-btn">
                      Send
							        </button>
                  </div>

                  <a href="/login" className="dis-block txt3 hov1 p-r-30 p-t-10 p-b-10 p-l-30">
                    Sign in
							<i className="fa fa-long-arrow-right m-l-5"></i>
                  </a>
                </div>
              </div>



            </form>


          </div>
        </div>
      </div>

    );
  };
}


export default ForgotPass;

