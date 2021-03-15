import React from 'react'

    const Demands = ({ demands }) => {
      return (
        <div>
          <center><h1>Demand List</h1></center>
          {demands.map((demand) => (
            <div class="demand">
              <div class="demand-body">
                <h5 class="demand-title">{demand.name}</h5>
                <h6 class="demand-price">{demand.price}</h6>
              </div>
            </div>
          ))}
        </div>
      )
    };

    export default Demands