// READING EACH PLACE DEATILS
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useState } from 'react';


function PlaceDetails() {
    const place = useParams().place; // get dynamic parameter
    var [data, setData] = useState([]);

    useEffect(function () {
        
    async function fetchData() { // fetch data from backend
        var detail = await fetch(`http://localhost:5000/Place/${place}`).then(resp => resp.json());
        setData(detail);
    }
        fetchData();
    },[place])


    function AddBalance() { // hide and show input box
        var inBal = document.getElementById('addBalance');
        if (inBal.style.display === "inline-block") {
            inBal.style.display = "none";
        } else {
            inBal.style.display = "inline-block";
        }
    }

    async function AddIt() {  // add the current balance
        var bal = Number(document.getElementById('balance').value);
        var obj = {
            place: place,
            balance: bal
        };
        if (bal === 0) alert('Enter The Amount');
        else {
            var Balance = await fetch('http://localhost:5000/addBalance', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(obj)
            }).then(resp => resp.json());
            if(Balance){
                alert('Added Successfully');
            }
            else{
                alert('Failed,Try Again');
            }
        }
    }

    function printData(data, index) {
        return <div key={index} className='details-page'>
            <h2>{data.Place}</h2><br />
            <h4 style={{ textAlign: 'center' }}>Current Balance : {data.Balance.Current}<button onClick={AddBalance}>Add Balance</button></h4>
            <form onSubmit={AddIt} id='addBalance'>
                <input type='number' name='balance' id='balance' placeholder='Enter The Amount' /><button type='submit'>Add It</button>
            </form>
            <br />
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
                {data.Payment.map(function (info,index) {
                    return <tbody key={index}>
                    <tr>
                        <td>{info.Date}-{info.Month}-{info.Year}</td>
                        <td>{info.Vehicle}</td>
                        <td>{info.Debit}</td>
                        <td>{info.Credit}</td>
                        <td>{info.Remarks}</td>
                    </tr>
                    </tbody>
                })}
            </table>
        </div>
    }

    return data.map(printData)
}

export default PlaceDetails;