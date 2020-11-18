// READING EACH VEHICLE DEATILS
import { useEffect } from 'react';
import {useParams} from 'react-router-dom';
import {useState} from 'react';

function printData(data,index){
    return <tr key={index}>
        <td>{data.Date}-{data.Month}-{data.Year}</td>
        <td>{data.DIno}</td>
        <td>{data.Place}</td>
        <td>{data.Qty}</td>
        <td>{data.Rate}</td>
        <td>{data.RateCost}</td>
        <td>{data.Diesel}</td>
        <td>{data.DieselPrice}</td>
        <td>{data.DieselCost}</td>
        <td>{data.Expenses}</td>
        <td>{data.Remarks}</td>
        <td>{data.Balance}</td>
    </tr>
}

function VehicleDetails(){
    const num=useParams().num; // get dynamic parameter
    var [data,setData]=useState([]);

    useEffect(function(){  
        fetchData();
    })

    async function fetchData(){ // fetch data from backend
        var detail = await fetch(`http://localhost:5000/Vehicle/${num}`).then(resp=>resp.json());
        setData(detail);
    }
    
return <div className='details-page'>
<h2>{num}</h2><br />
<table>
<tr>
    <th>Date</th>
    <th>DI no.</th>
    <th>Place</th>
    <th>Qty</th>
    <th>Rate</th>
    <th>Rate Amount</th>
    <th>Diesel</th>
    <th>Diesel Price</th>
    <th>Diesel Cost</th>
    <th>Other Expenses</th>
    <th>Remarks</th>
    <th>Balance</th>
</tr>
{data.map(printData)}
</table>
</div>
}

export default VehicleDetails;