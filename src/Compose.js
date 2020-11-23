// FOR ADDING EACH PLACE DETAILS
import {useState} from 'react';
import ComposePlaces from './ComposePlace';
import ComposeVehicle from './ComposeVehicle';

function Compose(){
    var [isVehicle,setIsVehicle] = useState(true);

    function changeCompose(event){
        if(event.target.id==='vehicle'){
            setIsVehicle(true);
        } else setIsVehicle(false);
    }

    async function formSubmit(details,url){
        const mssg=await fetch(`https://cryptic-journey-86272.herokuapp.com/${url}`,{  // send vehicleDetails to backend
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(details)
        }).then(response => response.json());

        if(mssg) alert('successfully added');
        else alert('Failed,try Again');
    }

    var yesterday=new Date();
    yesterday.setDate(yesterday.getDate()-1);
    var day=yesterday.getFullYear()+'-'+(yesterday.getMonth()+1)+'-'+yesterday.getDate();

    return <div className='compose-page'>
        <div className='form-toggle'>
            <input type='radio' name='compose' id='vehicle' onClick={changeCompose} defaultChecked/>
            <label htmlFor='vehicle'>Vehicle</label>
            <input type='radio' name='compose' id='place' onClick={changeCompose} />
            <label htmlFor='place'>Place</label>
            <br />
        </div>
        {isVehicle? <ComposeVehicle day={day} submit={formSubmit} /> : <ComposePlaces day={day} submit={formSubmit} />}
    </div>
}

export default Compose;