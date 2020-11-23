// FOR ADDING EACH PLACE DETAILS
function ComposePlaces(props){
    async function formSubmit(event)
    {
        const PlaceDetails={  // Object for vehicle details
            'Date':document.getElementById('date').value.slice(8,10),
            'Month':document.getElementById('date').value.slice(5,7),
            'Year':document.getElementById('date').value.slice(0,4),
            'Vehicle':document.getElementById('vehicleNum').value.toUpperCase(),
            'Credit':Number(document.getElementById('expenses').value),
            'Remarks':document.getElementById('remarks').value,
            'Place':document.getElementById('location').value.toUpperCase(),
        }
        
        props.submit(PlaceDetails,'ComposePlace');
    }

    return <form onSubmit={formSubmit}>
            <label htmlFor='date'>Date:</label>
            <input type='date' name='date' id='date' defaultValue={props.day} required /><br />
            <label htmlFor='vehiclenum'>Vehicle No. :</label>
            <input type='text' name='VehicleNum' id='vehicleNum' required/><br />
            <label htmlFor='location'>Place :</label>
            <input type='text' name='Place' id='location' required /><br />
            <label htmlFor='expenses'>Amount :</label>
            <input type='number' name='Expenses' id='expenses' /><br />
            <label htmlFor='remarks'>Remarks :</label>
            <input type='text' name='Remarks' id='remarks' /><br />
            <button type='submit'>Submit</button>
        </form>
}

export default ComposePlaces;