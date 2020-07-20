import React from "react";

import './Signup.css';
import { ToastContainer } from 'react-toastify';
import signupUser from './Signup.service';
const customNotification = require('../utils/notification');

class Signup extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            firstname: "",
            lastname: "",
            pseudonyme: "",
            password: "",
            email: "",
            confPassword: "",
            resgiterUser: "",
        }

        this.handleChange = this.handleChange.bind(this);
        this.handlFormSubmit = this.handlFormSubmit.bind(this);
    }

    async handlFormSubmit(e) {
        e.preventDefault();
        if (this.valdateFormData()) {
            let response = await signupUser(this.state);
            if (response.msg !== "" && response.code === 204)
                customNotification.fireNotification("error", response.msg)
            if (response.msg !== "" && response.code === 200)
                customNotification.fireNotification("success", response.msg)
        }
    }

    handleChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    valdateFormData() {
        let validateEmail = new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g);
        let validatePass = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
        if (this.state.password !== this.state.confPassword) {
            customNotification.fireNotification("warning", "Passwords does not match")
            return false;
        } else if (this.state.password.length < 8) {
            customNotification.fireNotification("warning", "Password must contain at least 8 characters")
            return false;
        } else if (!validateEmail.test(this.state.email)) {
            customNotification.fireNotification("warning", "Email not valid")
            return false;
        } else if (!validatePass.test(this.state.password)) {
            customNotification.fireNotification("warning", "Password not valid")
        }
        return true;
    }

    render() {
        return (
            <div className="limiter">
                <ToastContainer />
                <div className="container-login100">
                    <div className="login100-more"></div>

                    <div className="wrap-login100 p-l-50 p-r-50 p-t-72 p-b-50">
                        <form onSubmit={this.handlFormSubmit} encType="multipart/form-data" sclassName="login100-form validate-form">
                            <span className="login100-form-title p-b-59">
                                Sign Up
					</span>

                            <div className="wrap-input100 validate-input" data-validate="Name is required">
                                <span className="label-input100">Firstname</span>
                                <input className="input100" onChange={this.handleChange} name="firstname" type="text" placeholder="firstname..." required />
                                <span className="focus-input100"></span>
                            </div>

                            <div className="wrap-input100 validate-input" data-validate="Name is required">
                                <span className="label-input100">Lastname</span>
                                <input className="input100" onChange={this.handleChange} name="lastname" type="text" placeholder="lastname..." required />
                                <span className="focus-input100"></span>
                            </div>

                            <div className="wrap-input100 validate-input" data-validate="Name is required">
                                <span className="label-input100">Pseudonyme</span>
                                <input className="input100" onChange={this.handleChange} name="pseudonyme" name="pseudonyme" type="text" placeholder="pseudonyme..." required />
                                <span className="focus-input100"></span>
                            </div>

                            <div className="wrap-input100 validate-input" data-validate="Valid email is required: ex@abc.xyz">
                                <span className="label-input100">Email</span>
                                <input className="input100" type="text" onChange={this.handleChange} name="email" placeholder="Email addess..." required />
                                <span className="focus-input100"></span>
                            </div>


                            <div className="wrap-input100 validate-input" data-validate="Password is required">
                                <span className="label-input100">Password</span>
                                <input className="input100" type="text" onChange={this.handleChange} name="password" placeholder="*************" required />
                                <span className="focus-input100"></span>
                            </div>

                            <div className="wrap-input100 validate-input" data-validate="Repeat Password is required">
                                <span className="label-input100">Repeat Password</span>
                                <input className="input100" type="text" onChange={this.handleChange} name="confPassword" placeholder="*************" required />
                                <span className="focus-input100"></span>
                            </div>

                            {/* <div className="flex-m w-full p-b-33">
                                <div className="contact100-form-checkbox">
                                    <input className="input-checkbox100" id="ckb1" type="checkbox" name="remember-me" />
                                    <label className="label-checkbox100" for="ckb1">
                                        <span className="txt1">
                                            I agree to the
									<a href="#" className="txt2 hov1">
                                                Terms of User
									</a>
                                        </span>
                                    </label>
                                </div>


                            </div> */}

                            <div className="container-login100-form-btn">
                                <div className="wrap-login100-form-btn">
                                    <div className="login100-form-bgbtn"></div>
                                    <button type="submit" className="login100-form-btn">
                                        Sign Up
							</button>
                                </div>

                                <a href="/login" className="dis-block txt3 hov1 p-r-30 p-t-10 p-b-10 p-l-30">
                                    Sign in
							<i className="fa fa-long-arrow-right m-l-5"></i>
                                </a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
};

export default Signup;