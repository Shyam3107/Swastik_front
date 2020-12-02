// FOR ADDING EACH PLACE DETAILS
function Compose(props){

    function formSubmit(event)
    {
        var submitbutton=document.querySelector('button');
        submitbutton.innerText='Please Wait ...';
        submitbutton.disabled=true;
        const vehicleDetails={  // Object for vehicle details
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
            'Expenses':Number(document.getElementById('expenses').value),
            'Place':document.getElementById('place').value.toUpperCase(),
            'Remarks':document.getElementById('remarks').value
        }
        vehicleDetails.RateCost=vehicleDetails.Rate*vehicleDetails.Qty; // calculate rate cost

        fetch(`${props.url}/Compose`,{  // send vehicleDetails to backend
            method:'POST',
            headers:{
                'Access-Control-Allow-Origin':'*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(vehicleDetails)
        }).then(response => response.json())
        .then(mssg=>{
            if(mssg) alert('successfully added');
            else alert('Failed,try Again');
            submitbutton.innerText='Submit';
            submitbutton.disabled=false;
        }).catch(err=>{
            console.log(err);
            alert(err);
        });
    }

    var day=new Date();
    var today=day.getFullYear()+'-'+(day.getMonth()+1)+'-';
    if(day.getDate()<10) today+='0'+day.getDate();
    else today+=day.getDate();
    day.setDate(day.getDate()-1);
    var yesterday=day.getFullYear()+'-'+(day.getMonth()+1)+'-';
    if(day.getDate()<10) yesterday+='0'+day.getDate();
    else yesterday+=day.getDate();

    return <form className='compose-page' onSubmit={formSubmit}>

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

            <label htmlFor='expenses'>Other Expenses :</label>
            <input type='number' id='expenses' /><br />
            
            <label htmlFor='place'>Place :</label>
            <input type='text' id='place' /><br />

            <label htmlFor='remarks'>Remarks :</label>
            <input type='text' id='remarks' /><br />

            <button type='submit'>Submit</button>
        </form>
}

export default Compose;