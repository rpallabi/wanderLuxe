import axios from "axios";
import { ProgressSpinner } from 'primereact/progressspinner';
import React, { Component } from "react";
import { backendUrlBooking, backendUrlUser } from '../BackendURL';
import Login from './login';
import Navbar from './navbar';

class HotDeals extends Component {
    constructor(props) {
        super(props);
        // window.location.reload();
        this.state = {
            booked: [],
            errorMessage: "",
            loadBook: false,
            deleteMessage: "",
            loginStatus: false,
            dataStatus: false,
            bookDeleted: false,
            spinnerStatus: false,
            today: new Date(),
            hasReloaded: false,
            remainingDate: 0
        }
    }


    getHotDeals = () => {
        this.setState({ spinnerStatus: true })
        axios.get(backendUrlUser + '/getBookings/' + sessionStorage.getItem('userId'))
            .then(response => {
                //console.log("Yes");
                // window.location.reload();
                this.setState({ booked: response.data, errorMessage: null })
                //console.log(response.data);                
                this.setState({ spinnerStatus: false })

                if (this.state.booked.length !== 0) {
                    this.setState({ dataStatus: true })
                }
                if (sessionStorage.getItem('userId') != null) {
                    this.setState({ loginStatus: true })
                }
            }).catch(error => {
                console.log("No");

                this.setState({ errorMessage: error.message, hotDeals: null })
            })
        //console.log(sessionStorage.getItem('userId'),this.state.booked);

    }
    deleteBooking = (bookId) => {
        axios.delete(backendUrlBooking + '/cancelBooking/' + bookId)
            .then(response => {
                //console.log("Yes");
                this.setState({ deleteMessage: "Booking " + bookId + " will be canceled" }, () => {
                    window.location.reload();
                    alert(this.state.deleteMessage)
                })
                // toast.success("Booking successfull", {
                //     position: 'top-center'
                // })
            }).catch(error => {
                console.log("No");

                this.setState({ errorMessage: error.message, hotDeals: null })
            })
    }

    formatDate = (string) => {
        var options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(string).toLocaleDateString([], options);
    }

    displayBookings = () => {
        let hotDealsArray = [];
        let index = -1
        for (let book of this.state.booked) {
            { index = index + 1 }
            let element = (
                <div className="container col-sm-8" key={book.bookingId} >

                    <div className="card mb-3 border-info">
                        <div className="card-header "><h6>Booking ID : {book.bookingId}</h6></div>
                        <div className="row">
                            <div className="card-body col-md-8 offset-md-1" >
                                <h4 className="card-title text-info">{book.destinationName}</h4>
                                <h6 className="card-text">Trip starts on: {this.formatDate(book.checkInDate)}</h6>
                                <h6 className="card-text">Trip ends on: {this.formatDate(book.checkOutDate)}</h6>
                                <p className="card-text">Travellers: {book.noOfPersons}</p>
                                <p className="card-text"><small className="text-muted">Booked on: {this.formatDate(book.timeStamp)}</small></p>
                                {/* <p className="text-danger">{Math.round((this.state.today- new Date(book.checkInDate))/(1000 * 3600 * 24))}</p> */}
                                {/* <p className="text-danger">{this.state.today.toLocaleDateString()},{new Date(book.timeStamp).toLocaleDateString()}</p> */}
                                {/* var anotherDate = new Date("2022/11/15"); */}

                            </div>
                            <div className="col-ms-2 col-md-2" >
                                <h5 className="card-text" style={{paddingLeft:"12px"}}>Fare Details: ₹ {book.totalCharges}</h5>
                                {/* <h6 className="card-text text-danger" onClick={this.deleteBooking(this.state.booked.bookingId)}>Claim Refund</h6> */}
                                <button className="nav-link btn btn-link" style={{paddingLeft:"12px"}} disabled={(Math.round((this.state.today - new Date(book.checkInDate)) / (1000 * 3600 * 24))) >= 0} onClick={() => this.deleteBooking(book.bookingId)}>Claim Refund</button>
                                <p style={{paddingLeft:"12px"}}>{Math.round((this.state.today - new Date(book.checkInDate)) / (1000 * 3600 * 24)) > 0 ? <span className="text-success">Trip completed</span> : <span className="text-warning">{(Math.round((new Date(book.checkInDate) - this.state.today) / (1000 * 3600 * 24)))}&nbsp; Days remaining</span>}</p>
                            </div>
                        </div>
                    </div>
                </div >

            );
            hotDealsArray.push(element);
        }
        return hotDealsArray;
    }

    componentDidMount() {
        this.getHotDeals();
        const reloadCount = sessionStorage.getItem('reloadCount');
        if (reloadCount < 2) {
            sessionStorage.setItem('reloadCount', String(reloadCount + 1));
            window.location.reload();
        } else {
            sessionStorage.removeItem('reloadCount');
        }
    }
    // softRefreshPage = () =>{
    //     const navigate = useNavigate()
    //     // visit page that doesn't exist
    //     navigate("/packages");
    //     navigate(-1);
    // }
    render() {
        if (this.state.spinnerStatus) { return (<div className="text-center bookingDesign"><ProgressSpinner></ProgressSpinner></div>) }
        if (!this.state.loginStatus) { return (<div><h4 className="text-danger bookingDesign">You have not logged in, Please Login to continue</h4><Login></Login></div>) }
        else if (!this.state.dataStatus) { return (<div><h4 className="text-danger bookingDesign">Sorry you do not have any planned trips yet, Enjoy exploring...</h4></div>) }
        else {
            // his.props.location.state.source=='booked'?this.softRefreshPage():""
            return (
                <>
                    <Navbar />
                    <div className="bookingDesign">

                        {/* <!-- hot deals normal list display --> */}
                        <div className="row destination card">  {/* *ngIf="!bookingPage" */}
                            {this.displayBookings()}
                        </div >
                    </div >
                </>
            )
        }
    }
}

export default HotDeals;