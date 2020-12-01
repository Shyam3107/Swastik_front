import {useState,useEffect} from 'react'; 
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
        <td className='dieselPrice' id={data._id} contentEditable>{data.DieselPrice}</td>
        <td>{data.DieselCost}</td>
        <td>{data.Expenses}</td>
        <td>{data.Place}</td>
        <td>{data.Remarks}</td>
        <td>{data.Balance}</td>
    </tr>
    </tbody>
}

function Transaction(props){
    var day=new Date();
    var today=day.getFullYear()+'-'+(day.getMonth()+1)+'-'+day.getDate();

    var [detail,setDetails]=useState([]);
    var [dateInterval,setDateInterval]=useState({ // for filter data as per date
        From: today,
        To: today,
        details:detail
    });

    useEffect(()=>{
        fetch(`${props.url}/Transactions`).then(resp => resp.json())
        .then(data=> {
            setDetails(data); 
            setDateInterval({...dateInterval,details:data});
        });
    },[]);

    return <div className='details-page'>
        {/* this function return filtered data as per date */}
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
<button onClick={() => EditData(props.url)}>Submit</button>
</div>
}

export default Transaction;