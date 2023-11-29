import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import '../App.css'
import {Link} from "react-router-dom";
import {backendUrlUser} from '../BackendURL';
class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            registrationForm: {
                name:"",
                emailId:"",
                contactNo: "",
                password: ""
            },
            registrationFormMessage: {
                name:"",
                email:"",
                contactNo: "",
                password: ""
            },
            registrationFormValid: {
                name:false,
                email:false,
                contactNo: false,
                password: false,
                buttonActive: false
            },
            successMessage: "",
            errorMessage: "",
            loadLogin: false,
            userId: "",
            loginError:""
        }
    }

    

    handleChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        const { registrationForm } = this.state;
        this.setState({
            registrationForm: { ...registrationForm, [name]: value }
        });
        this.validateField(name, value);
    }

    register = () => {
        const { registrationForm } = this.state;
        axios.post(backendUrlUser+'/register', registrationForm)
            .then(response => {
                //let userId = response.data.userId;
                // sessionStorage.setItem("contactNo", response.data.contactNo);
                // sessionStorage.setItem("userId", userId);
                // sessionStorage.setItem("userName", response.data.name);
                this.setState({ loadLogin: true})
            }).catch(error => {
                this.setState({errorMessage : error.message , loginError:"contact number already registered !"});
                sessionStorage.clear();
            })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.register();
    }

    validateField = (fieldName, value) => {
        let fieldValidationErrors = this.state.registrationFormMessage;
        let formValid = this.state.registrationFormValid;
        switch (fieldName) {
            case "name":
                let nameReges=/^[a-zA-Z]+([\s]{1}[a-zA-Z]+)*$/
                if (value === '') {
                    fieldValidationErrors.name = 'Please enter your name'
                    formValid.name = false
                } else if(!value.match(nameReges)){
                    fieldValidationErrors.name="Please enter a valid name";
                    formValid.name =false
                }
                else{
                    fieldValidationErrors.name = ''
                    formValid.name = true
                }
                break;
            case "emailId":
                let emailRegex=/^[a-zA-Z0-9]+@{1}[a-z]+\.{1}com$/
                if (value === '') {
                    fieldValidationErrors.email = 'Please enter your email id'
                    formValid.email = false
                } else if(!value.match(emailRegex)){
                    fieldValidationErrors.email="Please enter valid email id";
                    formValid.email =false
                }
                else{
                    fieldValidationErrors.email = ''
                    formValid.email = true
                }
                break;
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
                    } else if (!(value.match(/[A-Z]/) && value.match(/[a-z]/) && value.match(/[0-9]/) && value.match(/[_!@#$%^&*]/)) || (value.length<7 || value.length>20)) {
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
        formValid.buttonActive = formValid.contactNo && formValid.password &&formValid.name && formValid.email;
        this.setState({
            registrationFormMessage: fieldValidationErrors,
            registrationFormValid: formValid,
            successMessage: ""
        });
    }
    render(){
        if (this.state.loadLogin === true) return (
            <div class="container h-100 d-flex justify-content-center">
                <div class="my-auto jumbotron">
                    <h1 className="display-4"><span className="text-success">Successfully Registered!</span></h1>
                    <h3 className="lead text-primary"><Link to="/login">Click here to Login</Link></h3>
                </div>
            </div>
          )
        else
        return(
            <div>
            <section id="registrationPage" className="registerSection" style={{minHeight:'62vh'}}>    {/* *ngIf="!registerPage"  */}
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-4 offset-md-4 ">
                            <h1>Join Us</h1>
                                <form onSubmit={this.handleSubmit}>
                                    <div className="form-group" >
                                        <label htmlFor="name">Name<span className="text-danger">*</span></label>
                                        <input type="text" value={this.state.registrationForm.name} onChange={this.handleChange} id="name" name="name" className="form-control" placeholder="Enter name"/>
                                        <span className="text text-danger">{this.state.registrationFormMessage.name}</span>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="inputEmail1">Email address<span className="text-danger">*</span></label>
                                        <input type="email" className="form-control" id="emailId" name="emailId" placeholder="Enter email" value={this.state.registrationForm.email} onChange={this.handleChange}/>
                                        <span className="text text-danger">{this.state.registrationFormMessage.email}</span>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="contactNumber">Contact Number<span className="text-danger">*</span></label>
                                        <input type="text" className="form-control" id="contactNumber" name="contactNo" placeholder="Enter your Contact Number" value={this.state.registrationForm.contactNo} onChange={this.handleChange}/>
                                        <span className="text text-danger">{this.state.registrationFormMessage.contactNo}</span>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="password1">Password<span className="text-danger">*</span></label>
                                        <input type="password" className="form-control" id="password" name="password" placeholder="Enter Password" value={this.state.registrationForm.password} onChange={this.handleChange}/>
                                        <span className="text text-danger">{this.state.registrationFormMessage.password}</span>
                                    </div>
                                    <div className="form-group">
                                        <button type="submit" className="btn btn-primary form-control"disabled={!this.state.registrationFormValid.buttonActive}>Submit</button>
                                        <span className="text text-danger">{this.state.loginError}</span>
                                    </div>
                                    <p>Already registered ? <Link  to="/login"> Login</Link> here</p>
                                    
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}
export default Register;