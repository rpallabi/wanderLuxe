import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link, Navigate } from 'react-router-dom';
import './App.css'
import './index.css'
import './Home.css'
import axios from "axios";
import { useState, useEffect } from "react";
import { backendUrlPackage, backendUrlBooking, backendUrlUser } from './BackendURL';
import Navbar from './components/Nav';
import { useParams } from 'react-router-dom';

function Home({}) {
  const [users, setUsers] = useState([])
  const [Uname, setUname] = useState('')
  const { uid } = useParams();
  function fetchUsers() {
    axios.get(backendUrlUser + "/getUsers")
      .then((response) => {
        setUsers(response.data)

      })
      .catch((error) => {

      })
  }
  useEffect(() => {
    setUname(sessionStorage.getItem('userId'))
    fetchUsers()
  }, []);
  // if (Uname!==''){
  //   console.log("lets go to Login...");
  //   return <Navigate replace to="/" />
  // }
  // else
  console.log("My UID: ",uid);
    return (
      <div>
        
        <div style={{ backgroundColor: "black" }}>
          <div style={{ minHeight: "80vh" }} className='masthead'>
          <Navbar /><br /><br /><br />
            {/* <header className="masthead " id="page-top"></header> */}
            <div className='row'>
              <div className='col-md-2'></div>
              <div className='col-md-8'>
                <span className='text-warning' style={{ fontSize: "30px" }}>Registered users</span><br />
                <table className="table table-dark table-bordered">
                  <thead>
                    <tr>
                      <th scope="col">User ID</th>
                      <th scope="col">Name</th>
                      <th scope="col">Email-id</th>
                      <th scope="col">Phone</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      users.map((user, id) => {
                        return (
                          <tr key={id}>
                            <td>{user.userId}</td>
                            <td>{user.name}</td>
                            <td>{user.emailId}</td>
                            <td>{user.contactNo}</td>
                          </tr>
                        )
                      })
                    }
                  </tbody>
                </table>
              </div>
              <div className='col-md-2'></div>
            </div>

          </div>

        </div>
      </div>
    );
}

export default Home;
