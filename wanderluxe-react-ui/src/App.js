import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch, Link, Redirect } from 'react-router-dom';

import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import Register from "./components/register";
import Login from './components/login';
import Home from './components/home';
import HotDeals from './components/hotdeals'
import Bookings from './components/bookings'
import Packages from './components/packages'
import Axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
      logged_userId: sessionStorage.getItem('userId'),
      logged_userName: sessionStorage.getItem('userName'),
      dialog_visible: false,
      logged_out: false,
      latitude: null,
      longitude: null,
      country:null,
      city:null,
      region:null,
      
    }
    
  }
  componentDidMount() {
    let cityy,statee;
    Axios.get('https://ipapi.co/json').then((loc)=>{
              console.log(loc.data.region);
              cityy=loc.data.city;
              statee=loc.data.region;
              this.setState({city:loc.data.city,country:loc.data.country_name})
              this.setState({state:loc.data.region})

            }).then(()=>{
              // console.log(this.city,this.state);
              
            }).catch((err)=>{
              console.log(err);
              // console.log(this.state.city,this.state.region);
            })
    // if (navigator.geolocation) {
    //   navigator.permissions
    //     .query({ name: "geolocation" })
    //     .then(function (result) {
    //       if (result.state === "granted") {
    //         console.log(result.state);
    //         //If granted then you can directly call your function here
    //         // navigator.geolocation.getCurrentPosition(function(position) {
    //         //   console.log("Latitude is :", position.coords.latitude);
    //         //   console.log("Longitude is :", position.coords.longitude);
    //         // });
            
    //         Axios.get('https://ipapi.co/json').then((loc)=>{
    //           console.log(loc.data);
    //           cityy=loc.data.city;
    //           statee=loc.data.region;
    //         }).then(()=>{
    //           // console.log(this.city,this.state);
              
    //         }).catch((err)=>{
    //           console.log(err);
    //           // console.log(this.state.city,this.state.region);
    //         })
            
    //       } else if (result.state === "prompt") {
    //         console.log(result.state);
    //       } else if (result.state === "denied") {
    //         //If denied then you have to show instructions to enable location
    //         alert("Please grant permissio for location")
    //       }
    //       result.onchange = function () {
    //         console.log(result.state);
    //       };
    //     });
    // } else {
    //   alert("Sorry Not available!");
    // }
    // console.log("'cityyy",cityy);
    
  }
  getLocation=async()=>{
    const loc= await Axios.get('https://ipapi.co/json');
    this.setState({location:loc})
    console.log(loc);
  }
  getCoordinates=()=> {
    navigator.geolocation.getCurrentPosition(function(position) {
      console.log("Latitude is :", position.coords.latitude);
      console.log("Longitude is :", position.coords.longitude);
    });
  }
  position = async () => {
    await navigator.geolocation.getCurrentPosition(
      position => this.setState({ 
        latitude: position.coords.latitude, 
        longitude: position.coords.longitude
      }), 
      err => console.log(err)
    );
    console.log(this.state.latitude)
  }
  //  success=(position) =>{
  //   const latitude = position.coords.latitude;
  //   const longitude = position.coords.longitude;
  //   console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
  // }
  
  onClick = (event) => {
    this.setState({ dialog_visible: true })
  }

  onHide = (event) => {
    this.setState({ dialog_visible: false });
  }

  logout = () => {
    console.log(this.state.dialog_visible);
    this.setState({ dialog_visible: false });
    sessionStorage.clear();
    this.setState({ logged_out: true });
    window.location.reload();
  }

  confirm_logout = () => {
    this.setState({ dialog_visible: true });
  }

  render() {

    const footer = (
      <div>
        <Button label="CONTINUE EXPLORING" icon="pi pi-check" onClick={this.onHide} />
        <Button label="Logout" icon="pi pi-times" onClick={this.logout} className="p-button-secondary" />
      </div>
    );

    return (
      <div>
        {console.log("Country",this.state.country,",",this.state.region,",",this.state.city)}
        <Router>
          <div className="App">
            <nav className="navbar navbar-expand-md sticky-top navbar transparent navbar-inverse">
              <div className="navbar-header ">
                <Link className="navbar-brand navstyleBrand" to="/"><img src="./assets/wanderluxe.png" width="60 px" height="40 px" alt="WanderLuxe Logo"></img></Link>
                {this.state.city?<span className=" navstyleBrand"><img src="./assets/pin.png" width="17 px" height="20 px" alt="location Logo"/> {this.state.city}, {this.state.country}</span>:'No Location'}
              </div>
              <ul className="navbar-nav ml-auto">
                {this.state.logged_userId ? <li className="nav-item">
                  <p className="nav-link " to="">Welcome {this.state.logged_userName.split(' ')[0].charAt(0).toUpperCase() + this.state.logged_userName.split(' ')[0].slice(1).toLowerCase()}</p>
                </li> : null}
                <li className="nav-item">
                  <Link className="nav-link navstyleBrand" to="/packages">Hot Deals </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link navstyleBrand" to="/viewBookings">Planned Trips</Link>
                </li>
                {!this.state.logged_userId ?
                  <li className="nav-item">
                    <Link className="nav-link navstyleBrand" to="/login"> Login</Link>
                  </li> : null}
                {this.state.logged_userId ?
                  <li className="nav-item">
                    <button className="buttonTransparent nav-link btn-link navstyleBrand " onClick={this.confirm_logout}>Logout</button>
                  </li> : null}
              </ul>
            </nav>
            {this.state.logged_out ? <Redirect to="/" /> : null}
            <div className="content-section implementation">
              <Dialog
                header="Confirmation"
                visible={this.state.dialog_visible}
                style={{ width: '50vw' }}
                footer={footer}
                onHide={this.onHide}
                maximizable
              >
                Are you sure you want to logout?
              </Dialog>
            </div>
            <Switch>
              <Route exact path="/" component={Home}></Route>
              <Route exact path="/login" component={Login}></Route>
              <Route exact path="/home/:userId" component={Home}></Route>
              <Route exact path="/register" component={Register}></Route>
              <Route exact path="/packages" component={HotDeals}></Route>{/* Only HotDeals*/}
              <Route exact path="/packages/:continent" component={Packages}></Route>{/* Destinations with search*/}
              <Route exact path="/book/:userId/:destinationId" component={Bookings}></Route>
              <Route exact path="/viewBookings" component={Bookings}></Route>
              <Route path="*" render={() => <Redirect to="/" />}></Route>
            </Switch>
          </div>
        </Router>
        <footer className="bg-black text-center text-white-50">
          Copyright &copy; www.wanderluxe.com {new Date().getFullYear()}
        </footer>
      </div>
    );
  }
}

export default App;
