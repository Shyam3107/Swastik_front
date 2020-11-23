// FOR ADDING VEHICLE DETAILS
function ComposeVehicle(props){
    function formSubmit(event)
    {
        const vehicleDetails={  // Object for vehicle details
            'Date':document.getElementById('date').value.slice(8,10),
            'Month':document.getElementById('date').value.slice(5,7),
            'Year':document.getElementById('date').value.slice(0,4),
            'Vehicle':document.getElementById('vehiclenum').value.toUpperCase(),
            'DIno':Number(document.getElementById('dino').value),
            'Place':document.getElementById('location').value.toUpperCase(),
            'Qty':Number(document.getElementById('qty').value),
            'Rate':Number(document.getElementById('rate').value),
            'RateCost' : 0,
            'Diesel':Number(document.getElementById('diesel').value),
            'DieselPrice':Number(document.getElementById('dieselP').value),
            'DieselCost' : 0,
            'Balance' :0,
            'Expenses':Number(document.getElementById('expenses').value),
            'Remarks':document.getElementById('remarks').value
        }
        vehicleDetails.DieselCost=(vehicleDetails.Diesel*vehicleDetails.DieselPrice).toFixed(2);  // calculate diesel cost
        vehicleDetails.RateCost=vehicleDetails.Rate*vehicleDetails.Qty; // calculate rate cost
        vehicleDetails.Balance=(vehicleDetails.RateCost-vehicleDetails.DieselCost-vehicleDetails.Expenses).toFixed(2); // net profit on that day
        props.submit(vehicleDetails,'ComposeVehicle');
    }

    

    return <form onSubmit={formSubmit}>
            <label htmlFor='date'>Date :</label>
            <input type='date' name='date' id='date' defaultValue={props.day} required /><br />
            <label htmlFor='vehicle'>Vehicle No. :</label>
            <input type='text' name='VehicleNum' id='vehiclenum' required/><br />
            <label htmlFor='dino'>DIno :</label>
            <input type='number' name='DIno' id='dino' /><br />
            <label htmlFor='location'>Place :</label>
            <input type='text' name='Place' id='location' required /><br />
            <label htmlFor='qty'>Qty :</label>
            <input type='number' name='Qty' id='qty' /><br />
            <label htmlFor='rate'>Rate :</label>
            <input type='number' name='Rate' id='rate' /><br />
            <label htmlFor='diesel'>Diesel :</label>
            <input type='number' name='Diesel' id='diesel' /><br />
            <label htmlFor='dieselP'>Diesel Price :</label>
            <input type='number' name='DieselP' id='dieselP' step='0.01'/><br />
            <label htmlFor='expenses'>Other Expenses :</label>
            <input type='number' name='Expenses' id='expenses' /><br />
            <label htmlFor='remarks'>Remarks :</label>
            <input type='text' name='Remarks' id='remarks' /><br />
            <button type='submit'>Submit</button>
        </form>
}

export default ComposeVehicle;