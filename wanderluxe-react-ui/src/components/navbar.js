import Axios from 'axios';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
export class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {

            logged_userId: sessionStorage.getItem('userId'),
            logged_userName: sessionStorage.getItem('userName'),
            dialog_visible: false,
            logged_out: false,
            latitude: null,
            longitude: null,
            country: null,
            city: null,
            region: null,
            continent: "",
            packagePage: false,
            successMessage: "",
            homePage: "",
            emailId: "",

        }

    }
    componentWillUnmount() {
        // fix Warning: Can't perform a React state update on an unmounted component
        this.setState = (state,callback)=>{
            return;
        };
    }
    nClick = (event) => {
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
    componentDidMount() {
        Axios.get('https://ipapi.co/json').then((loc) => {
            console.log(loc.data);
            this.setState({ city: loc.data.city, state: loc.data.region, country: loc.data.country_name })

        }).then(() => {
            // console.log(this.city,this.state);

        }).catch((err) => {
            console.log(err);
            // console.log(this.state.city,this.state.region);
        })
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
                <nav className="navbar navbar-expand-md fixed-top transparent navbar-inverse rounded-bottom">
                    <div className="container ">
                        <div className="navbar-header ">
                            <a className="navbar-brand navstyleBrand" href="/"><img src="http://localhost:4000/assets/wanderluxe.png" width="60 px" height="40 px" alt="WanderLuxe Logo"></img></a>
                            {this.state.city ? <span className=" navstyleBrand"><img src="http://localhost:4000/assets/pin.png" width="17 px" height="20 px" alt="location Logo" /> {this.state.city}, {this.state.country}</span> : 'No Location'}
                        </div>
                        <button className="navbar-toggler" type="button" data-mdb-toggle="collapse"
                            data-mdb-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                            aria-label="Toggle navigation">
                            <i className="fas fa-bars"></i>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav ml-auto">
                                {this.state.logged_userId ? <li className="nav-item">
                                    <p className="nav-link navstyleBrand" to="">Welcome {this.state.logged_userName.split(' ')[0].charAt(0).toUpperCase() + this.state.logged_userName.split(' ')[0].slice(1).toLowerCase()}</p>
                                </li> : null}
                                <li className="nav-item">
                                    <a className="nav-link navstyleBrand" href="/packages">Hot Deals</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link navstyleBrand" href="/viewBookings">Planned Trips</a>
                                </li>
                                {/* <li className="nav-item">
                                    <a className="nav-link navstyleBrand" href="/login">Login</a>
                                </li> */}
                                {/* {!this.state.logged_userId ?
                                    <li className="nav-item">
                                        <Link className="nav-link navstyleBrand" to="/login"> Login</Link>
                                    </li> : null}
                                {this.state.logged_userId ?
                                    <li className="nav-item">
                                        <button className="buttonTransparent nav-link btn-link navstyleBrand " onClick={this.confirm_logout}>Logout</button>
                                    </li> : null} */}
                                    {!this.state.logged_userId?
                                    <li className="nav-item">
                                        <a className="nav-link navstyleBrand" href="/login">Login</a>
                                    </li>:
                                    <li className='"nav-item'>
                                        <a className="nav-link navstyleBrand" onClick={this.confirm_logout}>Logout</a>
                                    </li>    
                                }
                            </ul>
                        </div>
                    </div>
                </nav>
                {this.state.logged_out ? <Navigate to="/" /> : null}
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
            </div>
        );
    }
}

export default Navbar;
