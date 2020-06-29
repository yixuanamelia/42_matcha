import React from "react";

class ForgotPass extends React.Component {
  render() {
    return (
      <div className="limiter">
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
                <input className="input100" type="text" name="email address" placeholder="email adress" />
                <span className="focus-input100"></span>
              </div>


              <div className="flex-m w-full p-b-33">
                <div className="container-login100-form-btn">
                  <div className="wrap-login100-form-btn">
                    <div className="login100-form-bgbtn"></div>
                    <button className="login100-form-btn">
                      Send
							        </button>
                  </div>
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

