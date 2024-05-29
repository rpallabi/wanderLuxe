import React from 'react';

function PackageCard({ packageData, setId }) {
    function handleDelete(id) {
        setId(id)
    }
  return (
    <div className="row" >
      {packageData.map((pkg) => (
        <div className="col-md-3 mb-4"  key={pkg.destinationId}>
          <div className="card" style={{height:"380px"}}>
            <img src={"http://localhost:4000/"+pkg.imageUrl} className="card-img-top" alt={pkg.name} style={{height:"50%"}} />
            <div className="card-body">
              <h5 className="card-title" style={{height:"35%"}}>{pkg.name}</h5>
              <span className="list-group-item">Continent: {pkg.continent}</span>
              <button className="btn btn-danger mt-3" onClick={()=>{handleDelete(pkg.destinationId)}}>Delete</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default PackageCard;
