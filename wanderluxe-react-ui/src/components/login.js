import axios from "axios";
import React, { Component } from "react";
import { Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { backendUrlUser } from '../BackendURL';
// import { InputText } from 'primereact/inputtext';
// import { Button } from 'primereact/button';
//import Register from "./register"
//import UserObj from '../actions/UserAction';
import Navbar from './navbar';
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loginform: {
                contactNo: "",
                password: ""
            },
            loginformErrorMessage: {
                contactNo: "",
                password: ""
            },
            loginformValid: {
                contactNo: false,
                password: false,
                buttonActive: false
            },
            userName: "",
            successMessage: "",
            errorMessage: "",
            loadHome: false,
            loadRegister: false,
            userId: "",
            loginError: ""
        }
    }
    handleClick = () => {
        this.setState({ loadRegister: true })
    }

    handleChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        const { loginform } = this.state;
        this.setState({
            loginform: { ...loginform, [name]: value }
        });
        this.validateField(name, value);
    }

    login = () => {

        const { loginform } = this.state;
        axios.post(backendUrlUser + '/login', loginform)
            .then(response => {
                let userId = response.data.userId;
                sessionStorage.setItem("contactNo", response.data.contactNo);
                sessionStorage.setItem("userId", userId);
                sessionStorage.setItem("userName", response.data.name);
                this.setState({ loadHome: true, userId: userId, userName: response.data.name }, () => {
                    // window.location.reload();
                })
            }).catch(error => {
                this.setState({ errorMessage: error.message, loginError: "Contact number or password incorrect !" });
                sessionStorage.clear();
            })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.login();
    }
    toasting = () => {
        console.log("testing");
        // toast("welcome"+this.state.userName,{
        //     position: 'top-center'
        // })
    }

    validateField = (fieldName, value) => {
        let fieldValidationErrors = this.state.loginformErrorMessage;
        let formValid = this.state.loginformValid;
        switch (fieldName) {
            case "contactNo":
                let cnoRegex = /^[1-9]\d{9}$/
                if (!value || value === "") {
                    fieldValidationErrors.contactNo = "Please enter your contact Number";
                    formValid.contactNo = false;
                } else if (!value.match(cnoRegex)) {
                    fieldValidationErrors.contactNo = "Contact number should be a valid 10 digit number";
                    formValid.contactNo = false;
                } else {
                    fieldValidationErrors.contactNo = "";
                    formValid.contactNo = true;
                }
                break;
            case "password":
                if (!value || value === "") {
                    fieldValidationErrors.password = "Password is manadatory";
                    formValid.password = false;
                } else if (!(value.match(/[A-Z]/) && value.match(/[a-z]/) && value.match(/[0-9]/) && value.match(/[_!@#$%^&*]/)) || (value.length < 7 || value.length > 20)) {
                    fieldValidationErrors.password = "Please Enter a valid password"
                    formValid.password = false;
                } else {
                    fieldValidationErrors.password = "";
                    formValid.password = true;
                }
                break;
            default:
                break;
        }
        formValid.buttonActive = formValid.contactNo && formValid.password;
        this.setState({
            loginformErrorMessage: fieldValidationErrors,
            loginformValid: formValid,
            successMessage: ""
        });
    }

    render() {
        console.log(this.state.loadHome);
        if (this.state.loadHome === true) return <Navigate to={'/'} />
        //console.log('/home/' + this.state.userId);

        if (this.state.loadRegister === true) return <Navigate to={'/register'} />
        return (
            <div>
                <Navbar />
                <section id="loginPage" className="loginSection">    {/* *ngIf="!registerPage"  */}
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-4 offset-4 ">
                                <h1>Login</h1>
                                <form className="form" onSubmit={this.handleSubmit}> {/* [formGroup]="loginForm" (ngSubmit)="login()" */}
                                    <div className="form-group">
                                        <label htmlFor="uContactNo">Contact Number<span className="text-danger">*</span></label>
                                        <input
                                            type="number"
                                            value={this.state.loginform.contactNo}
                                            onChange={this.handleChange}
                                            id="uContactNo"
                                            name="contactNo"
                                            className="form-control"
                                        />
                                    </div>
                                    {this.state.loginformErrorMessage.contactNo ? (<span className="text-danger">{this.state.loginformErrorMessage.contactNo}</span>) : null}

                                    <div className="form-group">
                                        <label htmlFor="uPass">Password<span className="text-danger">*</span></label>
                                        <input
                                            type="password"
                                            value={this.state.loginform.password}
                                            onChange={this.handleChange}
                                            id="uPass"
                                            name="password"
                                            className="form-control"
                                        />
                                    </div>
                                    {this.state.loginformErrorMessage.password ? (<span className="text-danger">{this.state.loginformErrorMessage.password}</span>) : null}<br />
                                    <span><span className="text-danger">*</span> marked feilds are mandatory</span>
                                    <br />
                                    <span className="text-danger"><h6>{this.state.loginError}</h6></span>

                                    <div>
                                        <button
                                            type="submit"
                                            disabled={!this.state.loginformValid.buttonActive}
                                            onClick={this.toasting}
                                            className="btn btn-primary form-control">
                                            Login
                                        </button>
                                        <ToastContainer />
                                    </div>
                                    <br />
                                    <div>
                                        <button className="btn btn-primary form-control" onClick={this.handleClick} >Click here to Register</button>
                                    </div>
                                    <div>
                                        {/* <button onClick={() => useAuth0()}>Log In</button> */}
                                    </div>
                                </form>
                                <br />
                                {/* <!--can be a button or a link based on need --> */}

                            </div>
                        </div>
                    </div>
                </section>
                {/* <div * ngIf= "!registerPage" >
            <router-outlet></router-outlet>
            </div > */}
                {/* *ngIf="!registerPage" */}
                {/* </div > */}
            </div>

        )
    }
}

export default Login;