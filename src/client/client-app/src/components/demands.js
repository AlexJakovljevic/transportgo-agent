import React from 'react'

    const Demands = ({ demands }) => {
      return (
        <div>
          <center><h1>Demand List</h1></center>
          {demands.map((demand) => (
            <div className="demand">
              <div className="demand-body">
                <h5 className="demand-title">{demand.name}</h5>
                <h6 className="demand-price">{demand.price}</h6>
              </div>
            </div>
          ))}
        </div>
      )
    };

    export default Demands