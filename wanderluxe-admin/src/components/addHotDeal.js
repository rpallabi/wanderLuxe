import React from 'react';
import { useState } from "react";
import '../register.css'
import axios from 'axios';
import Navbar from './Nav';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';

// import { useParams } from 'react-router-dom';
// import Pkg from '../misc/pkgModel';
function AddHotDeal() {
  // const { page } = useParams();
  const [days, setDays] = useState(0);
  const [noOfPkg, setNoOfPkg] = useState(1);
  const [noOfHighlights, setNoOfHighlights] = useState(1)
  // ===============================================================
  const [continent, setcontinent] = useState('')
  const [name, setname] = useState('')
  const [about, setabout] = useState('')
  const [sightSeeing, setsightSeeing] = useState([])
  const [packageInclusions, setpackageInclusions] = useState([])
  const [tourHighlights, settourHighlights] = useState([])
  const [tourPace, settourPace] = useState('')
  const [noOfNights, setnoOfNights] = useState(0.00)
  const [flightCharges, setflightCharges] = useState(0.00)
  const [chargesPerPerson, setchargesPerPerson] = useState(0.00)
  const [discount, setdiscount] = useState(0.00)
  const [availability, setavailability] = useState(0.00)
  const [selectedFile, setSelectedFile] = useState();
  const [selectedImage, setSelectedImage] = useState();
  const [progress, setProgress]= useState(false)
  //===========Validations===========================================
  const [validation, setValidation] = useState(false)
  const [validateitinerary, setValidateitinerary] = useState(false)
  const [validatecontinent, setValidatecontinent] = useState(false)
  const [validateabout, setValidateabout] = useState(false)
  const [validatepkginc, setValidatepkginc] = useState(false)
  const [validatehighL, setValidatehighL] = useState(false)
  const [validatetourPace, setValidatetourPace] = useState(false)
  const [validatename, setValidatename] = useState(false)
  const [validatenoOfNights, setValidatenoOfNights] = useState(false)
  const [validateflightCharges, setValidateflightCharges] = useState(false)
  const [validatechargePP, setValidatechargePP] = useState(false)
  const [validatediscounts, setValidatediscounts] = useState(false)
  const [validateavailability, setValidateavailability] = useState(false)
  const [validateformFile, setValidateformFile] = useState(false)
  // ===========================================================
  function itinerary(event) {
    let day = event.target.value;
    setDays(day)
  }
  function pkgsAdd() {
    setNoOfPkg(noOfPkg + 1)
  }
  function highAdd() {
    setNoOfHighlights(noOfHighlights + 1)
  }
  function highRemove() {
    if (noOfHighlights > 1) setNoOfHighlights(noOfHighlights - 1)
  }
  function pkgsRemove() {
    if (noOfPkg > 1) setNoOfPkg(noOfPkg - 1)
  }
//   useEffect(() => {
//     setUname(sessionStorage.getItem('userId'))
// },[]);
  //=====================================================================
  function handleChange(event) {
    let id = (event.target.id);
    let val = (event.target.value);
    console.log(id, ":", val);
    if (id.includes('itinerary')) {
      let newArr = [...sightSeeing]
      let lastChar = id.charAt(id.length - 1);
      let lastInt = parseInt(lastChar);
      newArr[lastInt] = val;
      setsightSeeing(newArr)
      if (val)
        setValidateitinerary(true)
      else setValidateitinerary(false)
    }
    if (id.includes('continent')) {
      setcontinent(val)
      if(val) setValidatecontinent(true)
      else setValidatecontinent(false)
    }
    if (id.includes('about')) {
      setabout(val)
      if(val)setValidateabout(true)
      else setValidateabout(false)
    }
    if (id.includes('pkginc')) {
      let newArr = [...packageInclusions]
      let lastChar = id.charAt(id.length - 1);
      let lastInt = parseInt(lastChar);
      newArr[lastInt] = val;
      setpackageInclusions(newArr)
      if(val)setValidatepkginc(true)
      else setValidatepkginc(false)
    }
    if (id.includes('highL')) {
      let newArr = [...tourHighlights]
      let lastChar = id.charAt(id.length - 1);
      let lastInt = parseInt(lastChar);
      newArr[lastInt] = val;
      settourHighlights(newArr)
      if(val)setValidatehighL(true)
      else setValidatehighL(false)
    }
    if (id.includes('tourPace')) {
      settourPace(val)
      if(val) setValidatetourPace(true)
      else setValidatetourPace(false)
    }
    if (id.includes('name')) {
      setname(val)
      if (val !== '') setValidatename(true)
      else setValidatename(false)
    }
    if (id.includes('noOfNights')) {
      setnoOfNights(val)
      if(val)setValidatenoOfNights(true)
      else setValidatenoOfNights(false)
    }
    if (id.includes('flightCharges')) {
      setflightCharges(val)
      if(val)setValidateflightCharges(true)
      else setValidateflightCharges(false)
    }
    if (id.includes('chargePP')) {
      setchargesPerPerson(val)
      if(val) setValidatechargePP(true)
      else setValidatechargePP(false)
    }
    if (id.includes('discounts')) {
      setdiscount(val)
      if(val) setValidatediscounts(true)
      else setValidatediscounts(false)
    }
    if (id.includes('availability')) {
      setavailability(val)
      if(val) setValidateavailability(true)
      else setValidateavailability(false)
    }
    if (id.includes('formFile')) {
      console.log("IMGG", event.target.files);
      setSelectedImage(URL.createObjectURL(event.target.files[0]));
      setSelectedFile(event.target.files[0])
      if(val) setValidateformFile(true)
      else setValidateformFile(false)
    }
    // console.log(validateitinerary, validatecontinent, validateabout, validatepkginc, validatehighL, validatetourPace, validatename, validatenoOfNights, validateflightCharges, validatechargePP, validatediscounts, validateavailability, validateformFile);
    
  }
  //=============================================
  function submitData() {
    const formData = new FormData()
    formData.append('file', selectedFile)
    const obj = {
      continent: continent,
      name: name,
      imageUrl: formData,
      details: {
        about: about,
        itinerary: {
          dayWiseDetails: {
            firstDay: sightSeeing[0],
            restDaysSightSeeing: sightSeeing.slice(1, days - 1),
            lastDay: sightSeeing[days - 1],
          },
          packageInclusions: packageInclusions,
          tourHighlights: tourHighlights,
          tourPace: tourPace
        }
      },
      noOfNights: noOfNights,
      flightCharges: flightCharges,
      chargesPerPerson: chargesPerPerson,
      discount: discount,
      availability: availability
    };

    console.log(obj);
    axios.post('http://localhost:4000/package/hotDeals', obj)
      .then(response => {
        console.log("Success");
        // setValidateformFile(false)
        // v=false
        // setname('')
      })
      .catch(error => {
        console.log(error.message);
      });
    console.log("Image: ", selectedFile);
  }
  function uploadimage() {
    const formData = new FormData();
    formData.append('file', selectedFile)
    setProgress(true)
    axios.post('http://localhost:4000/package/upload', formData)
      .then(response => {
        setTimeout(() => {
          setProgress(false)
          // setValidateformFile(false)
        }, 1500);
        
        console.log(response);
        console.log("Image upload Success");
      })
      .catch(error => {
        console.log('Image upload failed...', error.message);
      });
  }
  //=====================================================================
  function itineraryRender(count) {
    let it = []
    if (count > 0) {
      for (let i = 0; i < count; i++) {
        it.push(
          <div className='row'>
            <div className='col-md-3'> </div>
            <div className='col-md-6'>
              <label htmlFor="itinerary1">Day {i + 1} :</label>
              <input type="text" className="form-control" id={"itinerary " + i} onChange={handleChange} />
            </div>
          </div>
        )
      }
    }
    return it;
  }
  function pkgRender(count) {
    let it = []
    if (count > 0) {
      for (let i = 0; i < count; i++) {
        it.push(
          <div className='row'>
            <div className='col-md-3'> </div>
            <div className='col-md-6'>
              <label htmlFor="itinerary1"></label>
              <input type="text" className="form-control" id={"pkginc " + i} onChange={handleChange} />
            </div>
          </div>
        )
      }
    }
    return it;

  }
  function highlightsRender(count) {
    let it = []
    if (count > 0) {
      for (let i = 0; i < count; i++) {
        it.push(
          <div className='row'>
            <div className='col-md-3'> </div>
            <div className='col-md-6'>
              <label htmlFor="itinerary1"></label>
              <input type="text" className="form-control" id={"highL " + i} onChange={handleChange} />
            </div>
          </div>
        )
      }
    }
    return it;

  }
  let v= validateitinerary && validatecontinent && validateabout && validatepkginc && validatehighL && validatetourPace && validatename && validatenoOfNights && validateflightCharges && validatechargePP && validatediscounts && validateavailability && validateformFile
    console.log("validation: ",v);
    // console.log(page);
    // setValidation(v)
  return (
    <div>
      <Navbar /><br /><br /><br />
      <h1>Enter Hot Deal</h1><br /><br />
      <div className='bg'>
        <div className='row'>
          <div className='col-md-3'></div>
          <div className='col-md-6'>
            <label htmlFor="continent" className='col-md-6'>Continent :
              <input type="text" className="form-control" id="continent" onChange={handleChange} /></label>
            <label htmlFor="name" className='col-md-6'>Name
              <input type="text" className="form-control" id="name" onChange={handleChange} /></label>
          </div>
        </div>
        <div className='row'>
          <div className='col-md-3'></div>
          <div className='col-md-6'>
            <label htmlFor="formFile" className="form-label">Upload tour image :</label>
            <input className="form-control col-md-6" type="file" id="formFile" onChange={handleChange} /><br />
            {
              progress?<span className='text-danger'>Uploading.....</span>:<button type="button" className="btn btn-primary col-md-2" onClick={uploadimage} disabled={!validateformFile}>Upload</button>
            }
          </div>
          <br />
          {
            selectedImage?<img src={selectedImage} alt='uploaded image' style={{ height: '150px', width: '250px', alignItems: 'center' }} />:<span></span>
          }

        </div>
        <div className='row'>
          <div className='col-md-3'></div>
          <div className='col-md-6'>
            <label htmlFor="about" className="form-label">About :</label>
            <textarea className="form-control" id="about" rows="3" onChange={handleChange}></textarea>
          </div>
        </div>
        <div className='row'>
          <div className='col-md-3'></div>
          <div className='col-md-6'>
            <label htmlFor="days" className='col-md-6'>No Of Days :
              <input type="number" className="form-control" id="days" onChange={itinerary} /></label>
          </div>
        </div>
        <div className='row'>
          <div className='col-md-3'></div>
          <div className='col-md-6'>
            <label htmlFor="itinerary1">Enter itinerary(Day wise) :</label>
          </div>
        </div>
        <div className='row'>
          <div className='col-md-3'> </div>
          {itineraryRender(days)}
        </div>
        <div className='row'>
          <div className='col-md-3'></div>
          <div className='col-md-6'>
            <label htmlFor="itinerary1">Package inclusion :</label>
          </div>
        </div>
        <div className='row'>
          <div className='col-md-3'> </div>
          {pkgRender(noOfPkg)}
        </div>
        <br />
        <div className='row'>
          <div className='col-md-3'></div>
          <div className='col-md-6'>
            <button type="button" className="btn btn-info" style={{ width: "120px" }} onClick={pkgsAdd}>Add +1</button>&nbsp;
            <button type="button" className="btn btn-warning" style={{ width: "120px" }} onClick={pkgsRemove}>Remove -1</button>
          </div>
        </div>
        <div className='row'>
          <div className='col-md-3'></div>
          <div className='col-md-6'>
            <label htmlFor="itinerary1">Highlights :</label>
            {/* <input type="text" className="form-control" id="itinerary1" /> */}
          </div>
        </div>
        <div className='row'>
          <div className='col-md-3'> </div>
          {highlightsRender(noOfHighlights)}
        </div>
        <br />
        <div className='row'>
          <div className='col-md-3'></div>
          <div className='col-md-6'>
            <button type="button" className="btn btn-info" style={{ width: "120px" }} onClick={highAdd}>Add +1</button>&nbsp;
            <button type="button" className="btn btn-warning" style={{ width: "120px" }} onClick={highRemove}>Remove -1</button>
          </div>
        </div>
        <div className='row'>
          <div className='col-md-3'> </div>
          <div className='col-md-6'>
            <label htmlFor="tourPace">Tour Pace :</label>
            <input type="text" className="form-control" id="tourPace" onChange={handleChange} />
          </div>
        </div>
        <div className='row'>
          <div className='col-md-3'> </div>
          <div className='col-md-6'>
            <label htmlFor="noOfNights">No of nights :</label>
            <input type="number" className="form-control" id="noOfNights" onChange={handleChange} />
          </div>
        </div>
        <div className='row'>
          <div className='col-md-3'></div>
          <div className='col-md-6'>
            <label htmlFor="flightCharges">Flight charges(Rupees) : </label>
            <input type="number" className="form-control" id="flightCharges" onChange={handleChange} />
          </div>
        </div>
        <div className='row'>
          <div className='col-md-3'> </div>
          <div className='col-md-6'>
            <label htmlFor="chargePP">Charges per person :</label>
            <input type="number" className="form-control" id="chargePP" onChange={handleChange} />
          </div>
        </div>
        <div className='row'>
          <div className='col-md-3'></div>
          <div className='col-md-6'>
            <label htmlFor="discounts">Discounts : </label>
            <input type="number" className="form-control" id="discounts" onChange={handleChange} />
          </div>
        </div>
        <div className='row'>
          <div className='col-md-3'> </div>
          <div className='col-md-6'>
            <label htmlFor="availability">Availability :</label>
            <input type="number" className="form-control" id="availability" onChange={handleChange} />
          </div>
        </div>
        <br />
        <div className='row'>
          <div className='col-md-5'></div>
          <div className='col-md-2 d-grid gap-2'><button className="btn btn-outline-primary" style={{marginBottom:"10px"}} type="button" disabled={!v} onClick={submitData}>Submit</button></div>
          <div className='col-md-5'></div>
        </div><br/>
      </div>
    </div>
  );
}

export default AddHotDeal;
