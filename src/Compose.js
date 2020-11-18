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

    return <div className='compose-page'>
        <div className='form-toggle'>
            <input type='radio' name='compose' id='vehicle' onClick={changeCompose} checked={isVehicle && true}/>
            <label htmlFor='vehicle'>Vehicle</label>
            <input type='radio' name='compose' id='place' onClick={changeCompose} />
            <label htmlFor='place'>Place</label>
            <br />
        </div>
        {isVehicle? <ComposeVehicle /> : <ComposePlaces />}
    </div>
}

export default Compose;