import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link, Navigate } from 'react-router-dom';
import '../App.css'
import '../index.css'
import '../Home.css'
import '../register.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { useState, useEffect } from "react";
import { backendUrlPackage, backendUrlBooking, backendUrlUser } from '../BackendURL';
import { BsFillTrash3Fill } from "react-icons/bs";
import Navbar from './Nav';

function UserManagement() {
  const [users, setUsers] = useState([])
  const [refetch, setRefetch] = useState(false)
  const [errormsg, setErrorMsg] = useState('')
  const [launchModal, setLaunchModal] = useState(false)
  //==========================================================
  const [errname, setErrName] = useState('')
  const [erremailId, seteerrmailId] = useState('')
  const [errcontactNo, seterrcontactNo] = useState('')
  const [errpassowrd, seterrPassowrd] = useState('')
  const [registerError, setRegisterError] = useState('')
  const [mmooddaall, setmmooddaall] = useState('')
  //================
  const [buttonActive, setButtonActive] = useState(false)
  //================
  const [errValidname, setValidErrName] = useState(false)
  const [errValidemailId, setValideerrmailId] = useState(false)
  const [errValidcontactNo, setValiderrcontactNo] = useState(false)
  const [errValidpassowrd, setValiderrPassowrd] = useState(false)
  const [errValidConfirmPassowrd, seterrValidConfirmPassowrd] = useState(false)
  const [Uname, setUname] = useState('')
  //==========================================================
  const [errConfirmPassword, setErrConfirmPassword] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    password: '',
    contactNo: null,
    // confirmPassword:'',
    emailId: ''
  });
  //==========================================================
  function fetchUsers() {
    axios.get(backendUrlUser + "/getUsers")
      .then((response) => {
        setUsers(response.data)

      })
      .catch((error) => {

      })
  }
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'confirmPassword') {
      if (formData.password !== value) setErrConfirmPassword("Password mismatched")
      else {
        setErrConfirmPassword("")
        seterrValidConfirmPassowrd(true)
      }
    }
    else {
      setFormData(prevState => ({
        ...prevState,
        [name]: value
      }));
    }
    formValidation(name, value)

  };
  useEffect(() => {
    setUname(sessionStorage.getItem('userId'))
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    //registerAdmin
    axios.post(backendUrlUser + '/registerAdmin', formData)
      .then(response => {
        console.log(response.data);
        clears()
        setRefetch(!refetch)
        setmmooddaall("modal")
      }).catch(error => {
        // clears()
        //   toast.error(error.response.data.message, {
        //     position: 'top-center'
        // });
        setRegisterError(error.response.data.message)
        console.log(error.response.data.message);
      })
    // You can add your validation logic here before submitting the form
    // console.log(formData);
  };
  function formValidation(name, value) {
    switch (name) {
      case "name":
        let nameReges = /^[a-zA-Z]+([\s]{1}[a-zA-Z]+)*$/
        if (value === "") {
          setErrName("Please Enter your name")
          setValidErrName(false)
        }
        else if (!value.match(nameReges)) {
          setErrName("Please enter a valid name")
          setValidErrName(false)
        }
        else {
          setErrName("")
          setValidErrName(true)
        }
        break;
      case "emailId":
        // let emailRegex = /^[a-zA-Z0-9]+@{1}[a-z]+\.{1}com$/
        let emailRegex = /^\S+@\S+\.\S+$/
        if (value === "") {
          seteerrmailId("Please Enter your email")
          setValideerrmailId(false)
        }
        else if (!value.match(emailRegex)) {
          seteerrmailId("Please enter a valid email ID")
          setValideerrmailId(false)
        }
        else {
          seteerrmailId("")
          setValideerrmailId(true)
        }
        break;
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
      // case "confirmPassword":
      //   if (formData.password === value) {
      //     seterrValidConfirmPassowrd(true)
      //   }
      //   else seterrValidConfirmPassowrd(false)
      //   break
      default:
        break;

    }
    setButtonActive(errValidname && errValidcontactNo && errValidemailId && errValidpassowrd)
    console.log("Valid Name: " + errValidname + " Valid CN: " + errValidcontactNo + " Valid Email: " + errValidemailId + " Valid Password: " + errValidpassowrd + " Confirm: " + errValidConfirmPassowrd);

  }
  function clears() {
    setFormData({
      name: '',
      password: '',
      contactNo: '',
      // confirmPassword:'',
      emailId: ''
    });

  }
  function deleteUser(uid) {
    if (uid === 'U1002') {
      setErrorMsg('This Primary admin U1002 cannot be deleted !!')
      setTimeout(
        function () {
          setErrorMsg('')
        }
          .bind(this),
        2200
      );
    }
    else {
      setErrorMsg('')
      axios.delete(backendUrlUser + '/deleteUser/' + uid)
        .then((response) => {
          console.log("User deleted");

        }).catch((e) => {
          console.log(e.message);
        })
    }
  }
  function changeAdmin(access, id) {
    console.log(access, id);
    if (id === 'U1002') {
      setErrorMsg('This Primary admin U1002 cannot be changed to normal user !!')
      setTimeout(
        function () {
          setErrorMsg('')
        }
          .bind(this),
        2200
      );
    }
    else {
      axios.put(backendUrlUser + '/changeUserType/' + id + '/' + access)
        .then((response) => {
          console.log("User type changed");

        }).catch((e) => {
          console.log(e.message);
        })
    }
  }
  useEffect(() => {
    fetchUsers()
  }, [refetch]);

  console.log(buttonActive);

  // if (!Uname) return <Navigate replace to="/" />
  // else
    return (
      <div>
        <Navbar /><br /><br /><br />
        <div style={{ backgroundColor: "black", marginTop: "-1%" }}>
          <div style={{ minHeight: "100vh" }} className=''>
            {/* <header className="masthead " id="page-top"></header> */}
            <div className='row' style={{}}>
              <div className='col-md-2'></div>
              <div className='col-md-8'><br /><br />
                <span className='text-info' style={{ fontSize: "30px" }}>Registered users</span><br /><br />
                <table className="table table-dark table-bordered">
                  <thead>
                    <tr>
                      <th scope="col" className='text-info'>User ID</th>
                      <th scope="col" className='text-info' style={{ minWidth: "200px" }}>Name</th>
                      <th scope="col" className='text-info' >Email-id</th>
                      <th scope="col" className='text-info'>Phone</th>
                      <th scope='col' className='text-info'>User Type</th>
                      <th scope='col' className='text-info'>Admin?</th>
                      <th scope='col' className='text-info'>Remove</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      users.map((user, id) => {
                        let admiin;
                        if (user.admin) admiin = 'checked'
                        return (
                          <tr key={id}>
                            <td>{user.userId}</td>
                            <td>{user.name}</td>
                            <td>{user.emailId}</td>
                            <td>{user.contactNo}</td>
                            <td>{user.admin ? "Admin" : "User"}</td>
                            <center>
                              <td><div className="form-check form-switch">
                                <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" checked={user.admin} onClick={() => { changeAdmin(!user.admin, user.userId); setRefetch(!refetch) }} />
                              </div></td>
                            </center>
                            <td><BsFillTrash3Fill style={{ cursor: "pointer" }} onClick={() => { deleteUser(user.userId); setRefetch(!refetch) }} /></td>
                          </tr>
                        )
                      })
                    }
                  </tbody>
                </table>
                {errormsg !== "" ? <span className='text-danger animateText'>{errormsg}</span> : ""}
              </div>
              <div className='col-md-2' style={{ paddingTop: "2%" }}>

                <button type="button" className="btn btn-outline-info" data-bs-toggle="modal" onClick={() => { setRegisterError(false) }} data-bs-target="#exampleModal">
                  Add User
                </button>

                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                  <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Register a new user</h5>
                        {/* <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button> */}
                      </div>
                      <div className="modal-body">
                        <div className="row" style={{ paddingBottom: "25px" }}>
                          <div className="col-md-6">
                            <div className="form-group" style={{ paddingBottom: "15px" }}>
                              <input className="form-control" placeholder="Name *" type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required />
                              <span className='text-danger'>{errname}</span>
                            </div>
                            <div className="form-group">
                              <input className="form-control" placeholder="Phone Number *" type="tel"
                                name="contactNo"
                                value={formData.contactNo}
                                onChange={handleChange}
                                required />
                              <span className='text-danger'>{errcontactNo}</span>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group" style={{ paddingBottom: "15px" }}>
                              <input className="form-control" placeholder="Password *" type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required />
                              <span className='text-danger'>{errpassowrd}</span>
                            </div>
                            <div className="form-group" style={{ paddingBottom: "15px" }}>
                              <input className="form-control" placeholder="Confirm Password *" type="password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required />
                            </div>
                          </div>
                          <div className="col-md-12">
                            <div className="form-group" >
                              <input className="form-control" placeholder="Email *" type="email"
                                name="emailId"
                                value={formData.emailId}
                                onChange={handleChange}
                                required />
                              <span className='text-danger'>{erremailId}</span>
                            </div>

                          </div>
                          <div className='col-md-12'>
                            <span className='text-danger'>{errConfirmPassword}</span>
                          </div>
                        </div>
                      </div>
                      <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={clears}>Close</button>
                        <button type="button" className="btn btn-primary" data-bs-dismiss={mmooddaall} onClick={handleSubmit} disabled={!(buttonActive && errValidConfirmPassowrd)}>Add user</button>

                      </div>
                      <span className='text-danger'>{registerError}</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>

        </div>
      </div>
    );
}

export default UserManagement;
