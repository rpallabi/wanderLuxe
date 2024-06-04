import React from 'react';
import { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { backendUrlPackage, backendUrlBooking, backendUrlUser } from '../BackendURL';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';

import '../log.css'
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput
}
  from 'mdb-react-ui-kit';


function Login() {
  const [launchLogin, setLaunchLogin] = useState(false)

  //==========================================================
  const [errcontactNo, seterrcontactNo] = useState('')
  const [errpassowrd, seterrPassowrd] = useState('')
  const [LoginError, setLoginError] = useState('')
  //================
  const [uid, setUid] = useState(null)
  //================
  const [errValidcontactNo, setValiderrcontactNo] = useState(false)
  const [errValidpassowrd, setValiderrPassowrd] = useState(false)

  //==========================================================
  const [formData, setFormData] = useState({
    password: '',
    contactNo: null,
  });


  function log() {
    // console.log(formData);
    axios.post(backendUrlUser + '/login', formData)
      .then(response => {
        let userId = response.data.userId;
        sessionStorage.setItem("contactNo", response.data.contactNo);
        sessionStorage.setItem("userId", userId);
        sessionStorage.setItem("userName", response.data.name);
        setUid(userId)
        if (response.data.admin) {
          setLaunchLogin(true)
        }
        else setLoginError("Not an admin account ! Please log in with and Admin account.")

      }).catch(error => {
        setLoginError("Contact number or password incorrect !")
        sessionStorage.clear();
      })
  }
  function formValidation(name, value) {
    switch (name) {
      case "contactNo":
        let cnoRegex = /^[1-9]\d{9}$/
        if (!value || value === "") {
          seterrcontactNo("Please Enter your contact No")
          setValiderrcontactNo(false)
        }
        else if (!value.match(cnoRegex)) {
          seterrcontactNo("Please enter a valid Contact No")
          setValiderrcontactNo(false)
        }
        else {
          seterrcontactNo("")
          setValiderrcontactNo(true)
        }
        break;
      case "password":
        if (!value || value === "") {
          seterrPassowrd("Please Enter your password")
          setValiderrPassowrd(false)
        }
        else if (!(value.match(/[A-Z]/) && value.match(/[a-z]/) && value.match(/[0-9]/) && value.match(/[_!@#$%^&*]/)) || (value.length < 7 || value.length > 20)) {
          seterrPassowrd("Please enter a valid password")
          setValiderrPassowrd(false)
        }
        else {
          seterrPassowrd("")
          setValiderrPassowrd(true)
        }
        break;
      default:
        break;

    }
    // setButtonActive(errValidcontactNo && errValidpassowrd)
    // console.log("Valid Name: " + errValidname + " Valid CN: " + errValidcontactNo + " Valid Email: " + errValidemailId + " Valid Password: " + errValidpassowrd + " Confirm: " + errValidConfirmPassowrd);

  }
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginError('')
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));

    formValidation(name, value)

  };
  // console.log(errValidcontactNo +" Valids "+ errValidpassowrd);
  // console.log(sessionStorage.getItem('userId'));
  // console.log(launchLogin);
  if (launchLogin) return <Navigate replace to={"/home/" + uid} />
  else
    return (
      // launchLogin?<span></span>:
      <div className='' style={{ backgroundImage: "/bg.jpg" }}><br /><br /><br />
        <MDBContainer className="my-5 gradient-form loginTab">

          <MDBRow>

            <MDBCol col='6' className="mb-5" >
              <div className="d-flex flex-column ms-5" >
                <br /><br />
                <div className="text-center">
                  <img src="/wanderluxe.png"
                    style={{ width: '185px' }} alt="logo" />
                  <h4 className="mt-1 mb-5 pb-1 " style={{ color: " #ff6600" }}>WanderLuxe Admin</h4>
                </div>
                <h5>Hello Admin !</h5>
                <p>Please login to continue...</p>
                <div className="form-group">
                  <input type="email" className="form-control rounded" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter contact number"
                    name="contactNo"
                    value={formData.contactNo}
                    onChange={handleChange}
                    required
                  />
                  {errcontactNo ?
                    <span className='text-danger'>{errcontactNo}</span> : <span></span>
                  }
                </div>
                <br />
                <div className="form-group">
                  <input type="password" className="form-control rounded" id="exampleInputPassword1" placeholder="Password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required />
                  {
                    errpassowrd ?
                      <span className='text-danger'>{errpassowrd}</span> : <span></span>
                  }
                </div>
                <br />
                <div className="text-center pt-1 mb-5 pb-1">
                  <button type="button" style={{ color: "white" }} className=" btn mb-4 w-100 gradient-custom-2 rounded" onClick={log} disabled={!(errValidcontactNo && errValidpassowrd)}>Sign in</button>
                  {
                    LoginError ?
                      <span className='text-danger'>{LoginError}</span> : <span></span>
                  }
                </div>


              </div>

            </MDBCol>

            <MDBCol col='6' className="mb-5 d-flex flex-column  justify-content-center">
              <div className="d-flex flex-column  justify-content-center gradient-custom-2 h-auto mb-4" style={{ marginTop: "9px" }}>

                <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                  <h4 className="mb-4">Unleash the traveller inside you</h4>
                  <p className="small mb-0">When someone makes a travel plan, the first few things they want to sort out, are flights, accommodation, and other amenities for a convenient holiday. To enjoy holidays, you want to have the basics taken care of, especially for family vacations and honeymoon trips. You want your accommodation, return flight bookings, meals of the days, and other traveling formalities sorted beforehand. At wanderluxe, we take care of all the requirements to ensure that you get to enjoy the best of your holiday, exploring and experiencing the destination.
                  </p>
                </div>

              </div>

            </MDBCol>

          </MDBRow>

        </MDBContainer>
      </div>
    );
}

export default Login;
