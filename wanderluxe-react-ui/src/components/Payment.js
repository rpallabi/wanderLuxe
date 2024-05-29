import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { backendUrlBooking } from '../BackendURL';
import './Payment.css';


function Payment() {
  const [totalCharger, setTotatlCharger] = useState(null)
  const [name, setName] = useState(null)
  const [persons, setPersons] = useState(null)
  const [bookingDate, setBookingDate] = useState(null)
  const [flight, setFlisght] = useState(null)
  const [about, setAbout] = useState(null)
  const [cardError, setCardError] = useState('')
  const [enableButton, setEnableButton] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [goBooking, setGoBooking] = useState(false)
  const [card1Open, setCard1Open] = useState(false);
  useEffect(() => {
    setTotatlCharger(sessionStorage.getItem('charges'))
    setName(sessionStorage.getItem('name'))
    setPersons(sessionStorage.getItem('persons'))
    setBookingDate(sessionStorage.getItem('bookingdate'))
    setFlisght(sessionStorage.getItem('isFlight'))
    setAbout(sessionStorage.getItem('about'))
  });

  useEffect(() => {
    setEnableButton(false)
  }, [])
  const handleChange = (event) => {
    const { value: inputValue } = event.target;
    // Limiting the number of digits to 5
    if (inputValue.length === 12) {
      setCardError('');
    }
    else setCardError('invalid card number')
  };
  const sumitBooking = () => {
    axios.post(backendUrlBooking + '/' + sessionStorage.getItem("userId") + '/' + sessionStorage.getItem("dealId"), { checkInDate: sessionStorage.getItem("bookingdate"), noOfPersons: sessionStorage.getItem("persons") })
      .then(response => {
        if (sessionStorage.getItem("userId")) {
          toast.success("Booking successfull", {
            position: 'top-center'
          })
          setGoBooking(true)
        }
        //this.setState({ loadLogin: true})
      }).catch(error => {
        setErrorMsg(error.message)
      })
  }
  const cardToggle=()=>{
    setCard1Open(!card1Open)
    setEnableButton(false)
  }
  // console.log(card1Open)
  if (goBooking) return <Navigate to={'/viewBookings'} />
  else return (

    <div>
      <div className="containerStyle">
        <div className="row">
          <div className="col-lg-4 mb-lg-0 mb-3">
            <div className="card p-3">
              <div className="img-box">
                <img src="https://www.freepnglogos.com/uploads/visa-logo-download-png-21.png" alt="" className='imgStyle' />
              </div>
              <div className="number">
                <label className="fw-bold" htmlFor="">**** **** **** 1234</label>
              </div>
              <div className="d-flex align-items-center justify-content-between">
                <small><span className="fw-bold">Expiry date:</span><span>10/28</span></small>
                <small><span className="fw-bold">Name:</span><span>Pallabi</span></small>
              </div>
            </div>
          </div>
          <div className="col-lg-4 mb-lg-0 mb-3">
            <div className="card p-3">
              <div className="img-box">
                <img src="https://www.freepnglogos.com/uploads/mastercard-png/file-mastercard-logo-svg-wikimedia-commons-4.png" className='imgStyle'
                  alt="" />
              </div>
              <div className="number">
                <label className="fw-bold">**** **** **** 1234</label>
              </div>
              <div className="d-flex align-items-center justify-content-between">
                <small><span className="fw-bold">Expiry date:</span><span>10/28</span></small>
                <small><span className="fw-bold">Name:</span><span>Pallabi</span></small>
              </div>
            </div>
          </div>
          <div className="col-lg-4 mb-lg-0 mb-3">
            <div className="card p-3">
              <div className="img-box">
                <img src="https://www.freepnglogos.com/uploads/discover-png-logo/credit-cards-discover-png-logo-4.png" className='imgStyle'
                  alt="" />
              </div>
              <div className="number">
                <label className="fw-bold">**** **** **** 1234</label>
              </div>
              <div className="d-flex align-items-center justify-content-between">
                <small><span className="fw-bold">Expiry date:</span><span>10/28</span></small>
                <small><span className="fw-bold">Name:</span><span>Pallabi</span></small>
              </div>
            </div>
          </div>
          <div className="col-12 mt-4">
            <div className="card p-3">
              <p className="mb-0 fw-bold h4">Payment Methods</p>
            </div>
          </div>
          {/* =============== */}
          <div className="col-12">
            <div className="card p-3">
              <div className="card-body border p-0">
                <p>
                  <a className="btn btn-primary w-100 h-100 d-flex align-items-center justify-content-between"
                    data-bs-toggle="collapse" href="#collapseExample" role="button" aria-expanded={card1Open} onClick={cardToggle}
                    aria-controls="collapseExample">
                    <span className="fw-bold">UPI Payment</span>
                    <span className="fab fa-cc-paypal">
                    </span>
                  </a>
                </p>
                <div className={`collapse ${card1Open ? 'show' : ''} p-3 pt-0`} id="collapseExample1">
                  <div className="row">
                  <div className="col-lg-5 mb-lg-0 mb-3">
                      <p className="h4 mb-0">Summary</p>
                      <p className="mb-0"><span className="text-info fw-bold">Product:</span><span className="text-info c-green">: {name}</span>
                      </p>
                      <p className="mb-0">
                        <span className="fw-bold">Price:</span>
                        <span className="c-green">₹{totalCharger}.00</span>
                      </p>
                      <p className="mb-0">
                        <span className="fw-bold">No of person:</span>
                        <span className="c-green">{persons}</span>
                      </p>
                      <p className="mb-0">
                        <span className="fw-bold">Booking Date:</span>
                        <span className="c-green">{bookingDate}</span>
                      </p>
                      <p className="mb-0">
                        <span className="fw-bold"></span>
                        {flight ? <span className="text-success">With Flight</span> : <span className="text-error">Without flight</span>}
                      </p>
                    </div>
                    <div className="col-lg-7">
                      <div >
                        <div className="row">
                          <div className="col-12">
                            <div className="form__div" style={{paddingLeft:"20%"}}>
                              <img src='/qrCode.png' style={{height:"70%", width:"70%"}}/>
                            </div>
                          </div>
                          <div className="col-12">
                            <div className="btn btn-primary w-100" onClick={() => setEnableButton(true)}>Sumbit</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* ================================================================================================================= */}
              <div className="card-body border p-0">
                <p>
                  <a className="btn btn-primary p-2 w-100 h-100 d-flex align-items-center justify-content-between"
                    data-bs-toggle="collapse" href="#collapseExample" role="button" aria-expanded={!card1Open} onClick={cardToggle}
                    aria-controls="collapseExample">
                    <span className="fw-bold">Credit Card</span>
                    <span className="">
                      <span className="fab fa-cc-amex"></span>
                      <span className="fab fa-cc-mastercard"></span>
                      <span className="fab fa-cc-discover"></span>
                    </span>
                  </a>
                </p>
                <div className={`collapse ${!card1Open ? 'show' : ''} p-3 pt-0`} id="collapseExample2">
                  <div className="row">
                    <div className="col-lg-5 mb-lg-0 mb-3">
                      <p className="h4 mb-0">Summary</p>
                      <p className="mb-0"><span className="text-info fw-bold">Product:</span><span className="text-info c-green">: {name}</span>
                      </p>
                      <p className="mb-0">
                        <span className="fw-bold">Price:</span>
                        <span className="c-green">₹{totalCharger}.00</span>
                      </p>
                      <p className="mb-0">
                        <span className="fw-bold">No of person:</span>
                        <span className="c-green">{persons}</span>
                      </p>
                      <p className="mb-0">
                        <span className="fw-bold">Booking Date:</span>
                        <span className="c-green">{bookingDate}</span>
                      </p>
                      <p className="mb-0">
                        <span className="fw-bold"></span>
                        {flight ? <span className="text-success">With Flight</span> : <span className="text-error">Without flight</span>}
                      </p>
                    </div>
                    <div className="col-lg-7">
                      <div >
                        <div className="row">
                          <div className="col-12">
                            <div className="form__div">
                              <input type="number" className="form-control" placeholder=" " />
                              <label htmlFor="" className="form__label" onChange={handleChange}>Card Number</label>
                              {cardError ? <span className='text-danger'></span> : <></>}
                            </div>
                          </div>

                          <div className="col-6">
                            <div className="form__div">
                              <input type="text" className="form-control" placeholder=" " />
                              <label htmlFor="" className="form__label">MM / yy</label>
                            </div>
                          </div>

                          <div className="col-6">
                            <div className="form__div">
                              <input type="password" className="form-control" placeholder=" " />
                              <label htmlFor="" className="form__label">cvv code</label>
                            </div>
                          </div>
                          <div className="col-12">
                            <div className="form__div">
                              <input type="text" className="form-control" placeholder=" " />
                              <label htmlFor="" className="form__label">name on the card</label>
                            </div>
                          </div>
                          <div className="col-12">
                            <div className="btn btn-primary w-100" onClick={() => setEnableButton(true)}>Sumbit</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button type="button" className="btn btn-primary" disabled={!enableButton} onClick={sumitBooking}>Make Payment</button>
          {/* <div className="col-12">
            <div className="btn btn-primary payment" disabled={enableButton}>
              Make Payment
            </div>
          </div> */}
        </div>
        {/* <ToastContainer /> */}
      </div>
    </div>
  );
}

export default Payment;
