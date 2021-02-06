import React, { Component } from "react";
import { Link } from "react-router-dom";
import { myPostFetcher } from '../MyFetchers';


// #############################
import Bottom from '../Style/images/bottom-line-2.svg';
import Top from '../Style/images/top-line.svg';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Email: "",
            Password: "",
            TheUserIsLogin: false,
        };
        this.handleChange = this.handleChange.bind(this)
        this.handleLogin = this.handleLogin.bind(this)
    }
    // ##################################################################
    handleChange(e) {
        let forms = document.querySelectorAll(".forms");
        forms.forEach(form => {
            form.style.border = "";
        });
        const theFormName = e.target.name;
        const theFormValue = e.target.value;
        this.setState({
            [theFormName]: theFormValue,
        });
    }
    // ##################################################################
    async handleLogin(e) {
        e.preventDefault();
        document.querySelectorAll(".forms")[1].style.border = "";
        let data = {
            UserEmail: this.state.Email,
            Password: this.state.Password,
        }
        let isUserIsLogin = await myPostFetcher('/Users/login', data)
        console.log(isUserIsLogin.UserSignUp);
        if (isUserIsLogin.UserSignUp === true) {
            await this.setState({
                TheUserIsLogin: isUserIsLogin.UserSignUp,
            });
            this.props.onUserLogin({
                Email: this.state.Email,
                TheUserIsLogin: this.state.TheUserIsLogin
            })
        } else if (isUserIsLogin.UserSignUp === "wrong-password") {
            document.querySelectorAll(".forms")[1].style.border = "1px red solid";
        } else if (isUserIsLogin.UserSignUp === "wrong-email") {
            document.querySelectorAll(".forms")[0].style.border = "1px red solid";

        }
    }
    //? ##################################################################

    render() {
        return (
            <React.Fragment>
                <div className="login-container">
                    <div className="login-box">
                        <div className="forms-container"
                        >

                            <div className="form-container">
                                <form >
                                    <Form type="email" name="Email"
                                        onchange={this.handleChange}
                                    />
                                    <Form
                                        type="password"
                                        name="Password"
                                        onchange={this.handleChange}
                                    />
                                    <br />
                                    <div className="btn_container">
                                        <button
                                            onClick={this.handleLogin}
                                            type="submit"
                                            className="btn btn-primary"
                                        >
                                            Send
                                       </button>
                                    </div>
                                </form>
                                <div className="switch">
                                    I don't have an account
                                   <Link to="/SignUp">
                                        <button type="submit" className="btn btn-warning mt-1">
                                            SignUp
                                    </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <img src={Top} className="top-line" alt="top-line" />
                    <img src={Bottom} className="bottom-line" alt="bottom-line" />
                </div>
            </React.Fragment >
        )
    }


}

export const Form = ({ type, name, onchange, maxLength, minLength }) => {
    return (
        <div>
            {name !== "PasswordConfirmation" ? (
                <label htmlFor={name}>{name}</label>
            ) : (
                    <label htmlFor={name}>Confirmation</label>
                )}

            <input
                required
                type={type}
                name={name}
                id={name}
                className="forms"
                maxLength={maxLength}
                minLength={minLength}
                onChange={onchange}
            />
        </div>
    );
};


export default Login;
