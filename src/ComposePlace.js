// FOR ADDING EACH PLACE DETAILS
function ComposePlaces(){
    async function formSubmit(event)
    {
        const PlaceDetails={  // Object for vehicle details
            'Vehicle':document.getElementById('vehicleNum').value.toUpperCase(),
            'Credit':Number(document.getElementById('expenses').value),
            'Remarks':document.getElementById('remarks').value
        }

        const obj={
            'place':document.getElementById('location').value.toUpperCase(),
            'detail' : PlaceDetails
        }

        const mssg=await fetch('http://localhost:5000/ComposePlace',{  // send vehicleDetails to backend
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
        }).then(response => response.json());

        if(mssg) alert('successfully added');
        else alert('Failed,try Again');
    }

    return <form onSubmit={formSubmit}>
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