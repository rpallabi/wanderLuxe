import React, { Component } from "react";
import axios from "axios";
import {backendUrlUser,backendUrlBooking} from '../BackendURL';
import { ProgressSpinner } from 'primereact/progressspinner';
import {Link} from "react-router-dom";

import Login from './login'
class HotDeals extends Component {
    constructor(props) {
        super(props);
        //window.location.reload();
        this.state = {
            booked: [],
            errorMessage: "",
            loadBook:false,
            deleteMessage:"",
            loginStatus:false,
            dataStatus:false,
            bookDeleted:false,
            spinnerStatus:false
        }
    }
    removeBookings=()=>{
        
    }
    getHotDeals = () => {
        this.setState({spinnerStatus:true})
        axios.get(backendUrlUser+'/getBookings/'+sessionStorage.getItem('userId'))
            .then(response => {
                //console.log("Yes");
                this.setState({ booked: response.data, errorMessage: null })
                //console.log(response.data);                
                this.setState({spinnerStatus:false}) 

                if(this.state.booked.length!==0){
                    this.setState({dataStatus:true})
                }
                if(sessionStorage.getItem('userId')!=null){
                    this.setState({loginStatus:true})
                }
            }).catch(error => {
                console.log("No");
                
                this.setState({ errorMessage: error.message, hotDeals: null })
            })
            //console.log(sessionStorage.getItem('userId'),this.state.booked);
            
    }
    deleteBooking=(bookId)=>{
        axios.delete(backendUrlBooking+'/cancelBooking/'+bookId)
        .then(response => {
            //console.log("Yes");
            this.setState({ deleteMessage: "Booking "+bookId+" will be canceled" },()=>{
                window.location.reload();
                alert(this.state.deleteMessage)
            })
        }).catch(error => {
            console.log("No");
            
            this.setState({ errorMessage: error.message, hotDeals: null })
        })
    }

    formatDate=(string)=>{
        var options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(string).toLocaleDateString([],options);
    }

    displayBookings = () => {
        let hotDealsArray = [];
        let index=-1
        for (let book of this.state.booked) {
            {index=index+1}
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
                            </div>
                            <div className="col-ms-2">
                                <h5 className="card-text">Fare Details: ₹ {book.totalCharges}</h5>
                                {/* <h6 className="card-text text-danger" onClick={this.deleteBooking(this.state.booked.bookingId)}>Claim Refund</h6> */}
                                <button className="nav-link btn btn-link" onClick={() => this.deleteBooking(book.bookingId)}>Claim Refund</button>
                                
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
    }
    render() {
        if(this.state.spinnerStatus){return(<div className="text-center bookingDesign"><ProgressSpinner></ProgressSpinner></div>)}
        if(!this.state.loginStatus){return(<div><h4 className="text-danger bookingDesign">You have not logged in, Please <Link  to="/login"> Login</Link> to continue</h4></div> ) }
        else if(!this.state.dataStatus){return(<div><h4 className="text-danger bookingDesign">Sorry you do not have any planned trips yet, Enjoy exploring...</h4></div> )}
        else
        {
        return (
            <div className="bookingDesign">
                
                {/* <!-- hot deals normal list display --> */}
                <div className="row destination card">  {/* *ngIf="!bookingPage" */}
                    {this.displayBookings()}
                </div >
            </div >
        )}
    }
}

export default HotDeals;