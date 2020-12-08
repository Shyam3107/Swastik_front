// READING EACH VEHICLE DEATILS
import { useEffect } from 'react';
import {useParams} from 'react-router-dom';
import {useState} from 'react';
import DateFilter,{DateSection} from './DateFilter';
import EditData from './EditData';

function printData(data,index){
    return <tbody key={index}>
    <tr>
        <td>{data.Date}-{data.Month}-{data.Year}</td>
        <td>{data.From}</td>
        <td>{data.To}</td>
        <td>{data.DIno}</td>
        <td>{data.Qty}</td>
        <td>{data.Rate}</td>
        <td>{data.RateCost}</td>
        <td>{data.Diesel}</td>
        <td className='dieselPrice' id={data._id} suppressContentEditableWarning={true} contentEditable>{data.DieselPrice}</td>
        <td>{data.DieselCost}</td>
        <td>{data.Expenses}</td>
        <td>{data.Place}</td>
        <td>{data.Remarks}</td>
        <td>{data.Balance}</td>
    </tr>
    </tbody>
}

function VehicleDetails(props){
    const num=useParams().num; // get dynamic parameter

    var day=new Date();
    var today=day.getFullYear()+'-'+(day.getMonth()+1)+'-'+day.getDate();

    var [detail,setDetails]=useState([]);
    var [dateInterval,setDateInterval]=useState({
        From: today,
        To: today,
        details:detail
    });

    useEffect(()=>{
        // async function fetchData(){
        //     var data= await fetch(`${props.url}/vehicle/${num}`).then(resp=>resp.json());
        //     setDetails(data);
        // }
        //fetchData();
        fetch(`${props.url}/vehicle/${num}`).then(resp=>resp.json())
        .then(data=> {setDetails(data); setDateInterval(dateInterval=>({...dateInterval,details:data}))});
    },[num,props.url]);

    
return <div className='details-page'>
<h2>{num}</h2><br />
<DateSection setDateInterval={setDateInterval} />
<table>
    <thead>
<tr>
    <th>Date</th>
    <th>From</th>
    <th>To</th>
    <th>DI no.</th>
    <th>Qty</th>
    <th>Rate</th>
    <th>Rate Amount</th>
    <th>Diesel</th>
    <th>Diesel Price</th>
    <th>Diesel Cost</th>
    <th>Other Expenses</th>
    <th>Place</th>
    <th>Remarks</th>
    <th>Balance</th>
</tr>
</thead>
{DateFilter(dateInterval).map(printData)}
</table>
<button type="submit" onClick={() => EditData()}>Submit</button>
</div>
}

export default VehicleDetails;