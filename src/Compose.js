import postfetch from './postFetch';

function Compose(props){

    function formSubmit(event)
    {
        var vehicleDetails={  // Object for vehicle details
            'Date':document.getElementById('date').value.slice(8,10),
            'Month':document.getElementById('date').value.slice(5,7),
            'Year':document.getElementById('date').value.slice(0,4),
            'Vehicle':document.getElementById('vehicle').value.toUpperCase(),
            'From':document.getElementById('from').value.toUpperCase(),
            'To':document.getElementById('to').value.toUpperCase(),
            'DIno':Number(document.getElementById('dino').value),
            'Qty':Number(document.getElementById('qty').value),
            'Rate':Number(document.getElementById('rate').value),
            'Diesel':Number(document.getElementById('diesel').value),
            'DieselPrice':Number(document.getElementById('dieselP').value).toFixed(2),
            'Expenses':Number(document.getElementById('expenses').value),
            'Place':document.getElementById('place').value.toUpperCase(),
            'Remarks':document.getElementById('remarks').value
        }
        vehicleDetails.RateCost=(vehicleDetails.Rate*vehicleDetails.Qty).toFixed(2); // calculate rate cost
        vehicleDetails.DieselCost=(vehicleDetails.Diesel*vehicleDetails.DieselPrice).toFixed(2); // calculate diesel cost
        vehicleDetails.Balance=(vehicleDetails.RateCost-vehicleDetails.DieselCost-vehicleDetails.Expenses).toFixed(2);
        postfetch(vehicleDetails,"Compose");
    }

    var day=new Date();
    var today=day.getFullYear()+'-'+(day.getMonth()+1)+'-';
    if(day.getDate()<10) today+='0'+day.getDate();
    else today+=day.getDate();
    day.setDate(day.getDate()-1);
    var yesterday=day.getFullYear()+'-'+(day.getMonth()+1)+'-';
    if(day.getDate()<10) yesterday+='0'+day.getDate();
    else yesterday+=day.getDate();

    return <div className='compose-page'>

            <label htmlFor='date'>Date :</label>
            <input type='date' id='date' defaultValue={yesterday} max={today} required /><br />

            <label htmlFor='vehicle'>Vehicle No. :</label>
            <input type='text' id='vehicle' required/><br />

            <label htmlFor='from'>From :</label>
            <input type='text' id='from' /><br />

            <label htmlFor='to'>To :</label>
            <input type='text' id='to' /><br />

            <label htmlFor='dino'>DIno :</label>
            <input type='number' id='dino' /><br />

            <label htmlFor='qty'>Qty :</label>
            <input type='number' id='qty' /><br />

            <label htmlFor='rate'>Rate :</label>
            <input type='number' id='rate' /><br />

            <label htmlFor='diesel'>Diesel :</label>
            <input type='number' id='diesel' /><br />

            <label htmlFor='dieselP'>Diesel Price :</label>
            <input type='number' step='0.01' id='dieselP' /><br />

            <label htmlFor='expenses'>Other Expenses :</label>
            <input type='number' id='expenses' /><br />
            
            <label htmlFor='place'>Place :</label>
            <input type='text' id='place' /><br />

            <label htmlFor='remarks'>Remarks :</label>
            <input type='text' id='remarks' /><br />

            <button type='submit' onClick={formSubmit}>Submit</button>
        </div>
}

export default Compose;