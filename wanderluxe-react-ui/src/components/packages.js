import axios from 'axios';
import { Sidebar } from 'primereact/sidebar';
import React, { Component } from 'react';

import { InputSwitch } from 'primereact/inputswitch';
import { TabPanel, TabView } from 'primereact/tabview';
import { Link, Navigate } from "react-router-dom";
//import Book from './book';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { backendUrlBooking, backendUrlPackage } from '../BackendURL';
import Navbar from './navbar';

class Packages extends Component {
    constructor(props) {
        super(props);
        this.state = {
            donBooking: false,
            bookingForm: {
                noOfPersons: 0,
                date: "",
                flights: false
            },
            bookingFormErrorMessage: {
                noOfPersons: "",
                date: ""
            },
            bookingFormValid: {
                noOfPersons: false,
                date: false,
                buttonActive: false
            },
            bookingPage: false,
            show: false,
            showItinerary: false,
            packages: [],
            errorMessage: "",
            successMessage: "",
            totalCharges: "",
            continent: "",
            dealId: "",
            index: "",
            deal: "",
            spinnerStatus: false,
            packagePage: false,
            checkOutDate: new Date(),
            ifLogin: "",
            visibleRight: false,
            LoginChk: "",
            goBooking: false,
            flight: true,
            gotoBooking: false,
        }
    }

    getPackages = (continent) => {
        this.setState({ spinnerStatus: true })
        axios.get(backendUrlPackage + '/destinations/' + continent)
            .then((response) => {
                //console.log(response)
                this.setState({ packages: response.data, show: false })
                this.setState({ spinnerStatus: false })
                if (this.state.packages.length === 0) this.setState({ errorMessage: "some error occured" })
            }).catch(error => {
                this.setState({ errorMessage: error.message, packages: [] })
            })
    }

    getHotDeals = () => {
        axios.get(backendUrlPackage + "/hotDeals")
            .then((response) => {
                this.setState({ packages: response.data, show: false, errorMessage: null })
            })
            .catch((error) => {
                this.setState({ errorMessage: error.message, packages: null })
            })
    }

    componentDidMount() {
        window.scrollTo(0, 0)
        const continent = sessionStorage.getItem("continent");
        if (continent) { this.getPackages(continent) }
        else this.getHotDeals(this.state.continent);
    }

    handleChange = (event) => {
        const target = event.target;
        const name = target.name;
        this.setState({ donBooking: false })
        if (target.checked) {
            var value = target.checked;
        } else {
            value = target.value;
        }
        const { bookingForm } = this.state;
        this.setState({
            bookingForm: { ...bookingForm, [name]: value }
        });

        this.validateField(name, value);

    }

    validateField = (fieldname, value) => {
        let fieldValidationErrors = this.state.bookingFormErrorMessage;
        let formValid = this.state.bookingFormValid;
        switch (fieldname) {
            case "noOfPersons":
                if (value === "") {
                    fieldValidationErrors.noOfPersons = "This field can't be empty!";
                    formValid.noOfPersons = false;
                } else if (value < 1) {
                    fieldValidationErrors.noOfPersons = "No. of persons can't be less than 1!";
                    formValid.noOfPersons = false;
                } else if (value > 5) {
                    fieldValidationErrors.noOfPersons = "No. of persons can't be more than 5.";
                    formValid.noOfPersons = false;
                } else {
                    fieldValidationErrors.noOfPersons = "";
                    formValid.noOfPersons = true;
                }
                break;
            case "date":
                if (value === "") {
                    fieldValidationErrors.date = "This field can't be empty!";
                    formValid.date = false;
                } else {
                    let checkInDate = new Date(value);
                    let today = new Date();
                    if (today.getTime() > checkInDate.getTime()) {
                        fieldValidationErrors.date = "Check-in date cannot be a past date!";
                        formValid.date = false;
                    } else {
                        fieldValidationErrors.date = "";
                        formValid.date = true;
                    }
                }
                break;
            default:
                break;
        }
        console.log(sessionStorage.getItem('userId'));
        formValid.buttonActive = formValid.noOfPersons && formValid.date;
        // if(sessionStorage.getItem('userId')){

        //     this.setState({LoginChk:""})
        // }
        // else {
        //     formValid.buttonActive=false
        //     this.setState({LoginChk:"Please Login..."})
        // }
        this.setState({
            loginformErrorMessage: fieldValidationErrors,
            loginformValid: formValid,
            successMessage: ""
        });
    }

    calculateCharges = () => {
        this.setState({ totalCharges: 0 });
        let oneDay = 24 * 60 * 60 * 1000;
        let checkInDate = new Date(this.state.bookingForm.date);
        let checkOutDateinMs = Math.round(Math.abs((checkInDate.getTime() + (this.state.deal.noOfNights) * oneDay)));
        let finalCheckOutDate = new Date(checkOutDateinMs);
        this.setState({ checkOutDate: finalCheckOutDate.toDateString() });
        if (this.state.bookingForm.flights) {
            let totalCost = (this.state.bookingForm.noOfPersons * this.state.deal.chargesPerPerson) + (this.state.deal.flightCharges * this.state.bookingForm.noOfPersons);
            this.setState({ totalCharges: totalCost });
        } else {
            let totalCost = (this.state.bookingForm.noOfPersons * this.state.deal.chargesPerPerson);
            this.setState({ totalCharges: totalCost });
        }
    }

    getitinerary = (selectedPackage) => {
        this.setState({ index: 0, deal: selectedPackage, showItinerary: true })
    }

    openBooking = (selectedPackage) => {
        this.setState({ index: 2, deal: selectedPackage, showItinerary: true })
    }
    sumitBooking = () => {
        axios.post(backendUrlBooking + '/' + sessionStorage.getItem("userId") + '/' + sessionStorage.getItem("dealId"), { checkInDate: sessionStorage.getItem("checkInDate"), noOfPersons: sessionStorage.getItem("noOfPersons") })
            .then(response => {

                //this.setState({ loadLogin: true})
            }).catch(error => {
                this.setState({ errorMessage: error.message });
                sessionStorage.clear();
            })
    }
    loadBookingPage = (dealId) => {
        //console.log(dealId)
        //console.log(":here");
        // this.setState({ visibleRight: false });

        sessionStorage.setItem('noOfPersons', this.state.bookingForm.noOfPersons);
        sessionStorage.setItem('checkInDate', this.state.bookingForm.date);
        sessionStorage.setItem('flight', this.state.bookingForm.flights);
        sessionStorage.setItem('dealId', dealId);
        this.setState({ show: true, bookingPage: true, showItinerary: false, dealId: dealId, donBooking: true })
        if (sessionStorage.getItem("userId")) {
            toast.success("Booking successfull", {
                position: 'top-center'
            })
            // this.sumitBooking()
            this.setState({ goBooking: true })
            //window.location.reload();
            const { bookingForm } = this.state;
            this.setState({
                bookingForm: {
                    ...bookingForm, noOfPersons: 0,
                    date: "",
                    flights: false
                }
            });
            const { bookingFormValid } = this.state;
            this.setState({
                bookingFormValid: {
                    ...bookingFormValid, noOfPersons: false,
                    date: false,
                    buttonActive: false
                }
            });

        }
        else {
            alert("Please Login to Book any package")
            this.setState({ ifLogin: "Please Login to Book any package" })
        }
    }

    displayPackages = () => {
        if (!this.state.errorMessage) {
            let packagesArray = [];
            for (let mypackage of this.state.packages) {
                //let name = mypackage.imageUrl.split("/")[2]
                let element = (
                    <div className="card bg-light text-dark package-card" key={mypackage.destinationId}>
                        <div className="card-body row">
                            <div className="col-md-4">
                                <img className="package-image" src={("http://localhost:4000/" + mypackage.imageUrl)} alt="destination comes here" />
                            </div>
                            <div className="col-md-5">
                                <div className="featured-text text-center text-lg-left">
                                    <h4>{mypackage.name}</h4>
                                    <div className="badge badge-info">{mypackage.noOfNights}<em> Nights</em></div>
                                    {mypackage.discount ? <div className="discount text-danger">{mypackage.discount}% Instant Discount</div> : null}
                                    <p className="text-dark mb-0">{mypackage.details.about}</p>
                                </div>
                                <br />

                            </div>
                            <div className="col-md-3">
                                <h4>Prices Starting From:</h4>
                                <div className="text-center text-success"><h6>₹{mypackage.chargesPerPerson}</h6></div><br /><br />
                                <div><button className="btn btn-primary book" onClick={() => this.getitinerary(mypackage)}>View Details</button></div><br />
                                <div><button className="btn btn-primary book" onClick={() => this.openBooking(mypackage)}>Book </button>  </div>
                            </div>
                        </div>
                    </div>
                )
                packagesArray.push(element);
            }
            return packagesArray;
        } else {
            let element = (
                <div className="offset-md-2">
                    <h2>Sorry we don't operate in this Destination.</h2><br />
                    < Link to="/packages" className="btn btn-success">Click Here to checkout our Hot Deals</Link>
                </div>
            )
            return element;
        }

    }

    displayPackageInclusions = () => {
        const packageInclusions = this.state.deal.details.itinerary.packageInclusions;
        if (this.state.deal) {
            return packageInclusions.map((pack, index) => (<li key={index}>{pack}</li>))
        }
        else {
            return null;
        }
    }

    displayPackageHighlights = () => {
        let packageHighLightsArray = [];
        let firstElement = (
            <div key={0}>
                <h3>Day Wise itinerary</h3>
                <h5>Day 1</h5>
                {this.state.deal ? <div>{this.state.deal.details.itinerary.dayWiseDetails.firstDay}</div> : null}
            </div>
        );
        packageHighLightsArray.push(firstElement);
        if (this.state.deal) {
            this.state.deal.details.itinerary.dayWiseDetails.restDaysSightSeeing.map((packageHighlight, index) => {
                let element = (
                    <div key={index + 1}>
                        <h5>Day {this.state.deal.details.itinerary.dayWiseDetails.restDaysSightSeeing.indexOf(packageHighlight) + 2}</h5>
                        <div>{packageHighlight}</div>
                    </div>
                );
                packageHighLightsArray.push(element)
            });
            let lastElement = (
                <div key={666}>
                    <h5>Day {this.state.deal.details.itinerary.dayWiseDetails.restDaysSightSeeing.length + 2}</h5>
                    {this.state.deal.details.itinerary.dayWiseDetails.lastDay}
                    <div className="text-danger">
                        **This itinerary is just a suggestion, itinerary can be modified as per requirement. <a
                            href="#contact-us">Contact us</a> for more details.
                    </div>
                </div>
            );
            packageHighLightsArray.push(lastElement);
            return packageHighLightsArray;
        } else {
            return null;
        }
    }
    bookandpay = (dealId) => {
        if (sessionStorage.getItem("userId")) {
            this.setState({ gotoBooking: true }, () => {
                sessionStorage.setItem("charges", this.state.totalCharges);
                sessionStorage.setItem("name", this.state.deal.name)
                sessionStorage.setItem("persons", this.state.bookingForm.noOfPersons);
                sessionStorage.setItem('bookingdate', this.state.bookingForm.date)
                sessionStorage.setItem("isFlight", this.state.bookingForm.flights);
                sessionStorage.setItem("about", this.state.deal.details.about)
                sessionStorage.setItem('dealId', dealId);
                console.log("Lets pay...");
                // window.location.reload();
            })
        }
        else {
            this.setState({ gotoBooking: false })
            alert("Please Login to Book any package")
            this.setState({ ifLogin: "Please Login to Book any package" })
        }


    }
    handleSubmit = (event) => {
        event.preventDefault();
        this.calculateCharges();
    }

    render() {
        const { gotoBooking } = this.state;
        console.log(gotoBooking);
        if (gotoBooking) return <Navigate to={'/Payment'} />
        // if (this.state.goBooking === true) return <Redirect to={'/viewBookings'} />
        return (
            <div style={{ minHeight: "75vh" }}>
                <Navbar />
                {
                    !this.state.packagePage ?
                        (
                            <div className='hotDealsMain'>
                                {this.displayPackages()}
                                {
                                    this.state.errorMessage ?
                                        (
                                            <div className="offset-md-2">
                                                <h2></h2><br />
                                            </div>
                                        )
                                        : null
                                }
                            </div>
                        ) : null
                }
                <Sidebar visible={this.state.showItinerary} position="right" className="p-sidebar-lg sidebarStyle" onHide={(e) => this.setState({ showItinerary: false })}>
                    <h2>{this.state.deal.name}</h2>
                    <TabView activeIndex={Number(this.state.index)} onTabChange={(e) => this.setState({ index: e.index })}>
                        <TabPanel header="Overview">
                            <div className="row">
                                {this.state.deal ?
                                    <div className="col-md-6 text-center">
                                        <img className="package-image" src={("http://localhost:4000/" + this.state.deal.imageUrl)} alt="destination comes here" />
                                    </div> : null}
                                <div className="col-md-6">
                                    <h4>Package Includes:</h4>
                                    <ul>
                                        {this.state.showItinerary ? this.displayPackageInclusions() : null}
                                    </ul>
                                </div>
                            </div>
                            <div className="text-justify itineraryAbout">
                                <h4>Tour Overview:</h4>
                                {this.state.deal ? this.state.deal.details.about : null}
                            </div>
                        </TabPanel>
                        <TabPanel header="Itinerary">
                            {this.displayPackageHighlights()}
                        </TabPanel>
                        <TabPanel header="Book">
                            <h4 className="itenaryAbout text-success">**Charges per person: Rs. {this.state.deal.chargesPerPerson}</h4>
                            <form onSubmit={this.handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="noOfPersons">Number of Travelers:</label>
                                    <input
                                        type="number"
                                        id="noOfPersons"
                                        className="form-control"
                                        name="noOfPersons"
                                        value={this.state.bookingForm.noOfPersons}
                                        onChange={this.handleChange}
                                    />
                                    {this.state.bookingFormErrorMessage.noOfPersons ?
                                        <span className="text-danger">{this.state.bookingFormErrorMessage.noOfPersons}</span>
                                        : null}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="date">Trip start Date:</label>
                                    <input
                                        type="date"
                                        id="date"
                                        className="form-control"
                                        name="date"
                                        value={this.state.bookingForm.date}
                                        onChange={this.handleChange}
                                    />
                                    {this.state.bookingFormErrorMessage.date ?
                                        <span className="text-danger">{this.state.bookingFormErrorMessage.date}</span>
                                        : null}
                                </div>
                                <div className="form-group">
                                    <label>Include Include Flights:</label>&nbsp;
                                    <InputSwitch name="flights" id="flights"
                                        checked={this.state.bookingForm.flights}
                                        onChange={this.handleChange} />
                                </div>
                                <div className="form-group">
                                    <button id="buttonCalc" className="btn btn-primary" type="submit" disabled={!this.state.bookingFormValid.buttonActive}>Calculate Charges</button>&nbsp;
                                </div>
                            </form>
                            {!this.state.totalCharges ?
                                (
                                    <React.Fragment><span>**Charges Exclude flight charges.</span><br /></React.Fragment>
                                )
                                :
                                (
                                    <h4 className="text-success">
                                        Your trip ends on {this.state.checkOutDate} and
                                        you will pay ₹{this.state.totalCharges}
                                    </h4>
                                )
                            }

                            <div className="text-center">
                                <button disabled={!this.state.bookingFormValid.buttonActive} className="btn btn-success" onClick={() => this.bookandpay(this.state.deal.destinationId)}>Book</button>

                                &nbsp; &nbsp; &nbsp;
                                <button type="button" className="btn btn-link" onClick={(e) => this.setState({ showItinerary: false, donBooking: false })}>Cancel</button>
                            </div>
                            {/* <div>
                                {this.state.donBooking ? <span className='text-success'>Booking successsfull</span> : ""}
                            </div> */}
                        </TabPanel>
                    </TabView>
                </Sidebar>
                <ToastContainer />
            </div >
        )
    }
}
// <Redirect to="/book" />
export default Packages;