// READING EACH PLACE DEATILS
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import DateFilter,{DateSection} from './DateFilter';


function PlaceDetails(props) {
    const place = useParams().place; // get dynamic parameter

    var day=new Date();
    var today=day.getFullYear()+'-'+(day.getMonth()+1)+'-'+day.getDate();

    var [{detail,Balance},setDetails]=useState({detail:[],Balance:0});
    var [dateInterval,setDateInterval]=useState({
        From: today,
        To: today,
        details:detail
    });

    useEffect(()=>{
        // async function fetchData(){
        //    var data= await fetch(`${props.url}/Place/${place}`).then(resp => resp.json());
        //    setDetails(data);
        // }
        // fetchData();
        fetch(`${props.url}/Place/${place}`).then(resp => resp.json())
        .then(data=> {setDetails(data); setDateInterval({...dateInterval,details:data.detail});});
    },[]);

    function showInput() { // hide and show input box
        var inBal = document.getElementById('addBalance');
        if (inBal.style.display === "inline-block") {
            inBal.style.display = "none";
        } else {
            inBal.style.display = "inline-block";
        }
    }

    function AddIt() {  // add the current balance
        var submitbutton=document.querySelectorAll('button')[1];
        submitbutton.innerText='Please Wait ...';
        submitbutton.disabled=true;
        var bal = Number(document.getElementById('balance').value);
        var obj = {
            Place: place,
            Debit: bal,
            Remarks:'Cash Received'
        };
        if (bal === 0) alert('Enter The Amount');
        else {
            fetch(`${props.url}/addBalance`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(obj)
            })
            .then(resp => resp.json())
            .then(res =>{
                if(res) alert('Added Successfully');
                else alert('Failed,Try Again');
                submitbutton.innerText='Submit';
                submitbutton.disabled=false;
            }).catch((err)=>{
                console.log(err);
                alert(err);
            });
        }
    }

    var netCredit=0;
    var netDebit=0;

    return <div className='details-page'>
    <h2>{place}</h2><br />
    <h4 style={{ textAlign: 'center' }}>Current Balance : {Balance}<button onClick={showInput}>Add Balance</button></h4>
    <form onSubmit={AddIt} id='addBalance'>
        <input type='number' name='balance' id='balance' placeholder='Enter The Amount' /><button type='submit'>Add It</button>
    </form>
    <br />
    <DateSection setDateInterval={setDateInterval} />
    <table>
        <thead>
        <tr>
            <th>Date</th>
            <th>Vehicle No.</th>
            <th>Debit</th>
            <th>Credit</th>
            <th>Remarks</th>
        </tr>
        </thead>
        {DateFilter(dateInterval).map(function (info,index) {
            info.Debit && (netDebit+=info.Debit);
            info.Expenses && (netCredit+=info.Expenses);
            return <tbody key={index}>
            <tr>
                <td>{info.Date}-{info.Month}-{info.Year}</td>
                <td>{info.Vehicle}</td>
                <td>{info.Debit}</td>
                <td>{info.Expenses}</td>
                <td>{info.Remarks}</td>
            </tr>
            </tbody>
        })}
        <tbody>
            <tr>
                <td></td>
                <th>Total:</th>
                <td className='net-expenses'>{netDebit}</td>
                <td className='net-expenses'>{netCredit}</td>
            </tr>
            </tbody>
    </table>
</div>
}

export default PlaceDetails;