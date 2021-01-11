// READING EACH VEHICLE DEATILS
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import DateFilter, { DateSection, today } from './DateFilter';
import exportTableToExcel from './exportTableToExcel';



function VehicleDetails(props) {
    const num = useParams().num; // get dynamic parameter

    var [detail, setDetails] = useState([]);
    var [dateInterval, setDateInterval] = useState({
        From: today,
        To: today,
        details: detail
    });

    useEffect(() => {
        // async function fetchData(){
        //     var data= await fetch(`${props.url}/vehicle/${num}`).then(resp=>resp.json());
        //     setDetails(data);
        // }
        //fetchData();
        fetch(`${props.url}/vehicle/${num}`).then(resp => resp.json())
            .then(data => { setDetails(data); setDateInterval(dateInterval => ({ ...dateInterval, details: data })) });
    }, [num, props.url]);

    var netRateAmt = 0;
    var netDiesel = 0;
    var netDieselCost = 0;
    var netExpenses = 0;
    var netBalance = 0;

    function printData(data, index) {
        var date = new Date(data.Date);
        data.RateCost && (netRateAmt += data.RateCost);
        data.Diesel && (netDiesel += data.Diesel);
        data.DieselCost && (netDieselCost += data.DieselCost);
        data.Expenses && (netExpenses += data.Expenses);
        data.Balance && (netBalance += data.Balance);
        return <tbody key={index}>
            <tr>
                <td>{date.getDate()}-{date.getMonth() + 1}-{date.getFullYear()}</td>
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

    var data = DateFilter(dateInterval);

    return <div className='details-page'>
        <h2>{num}</h2><br />
        <DateSection setDateInterval={setDateInterval} />
        {data.length === 0 ? <div><h2>NO DATA FOUND FOR SELECTED DATE INTERVAL</h2></div> : <div>
            <button onClick={() => exportTableToExcel(
                'transact', num)}>
                Click to Export
            </button>
            <div className="tablediv">
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
                    {data.map(printData)}
                    <tbody>
                        <tr>
                            <th colSpan="6">Total</th>
                            <th>{netRateAmt}</th>
                            <th>{netDiesel}</th>
                            <th></th>
                            <th>{netDieselCost}</th>
                            <th>{netExpenses}</th>
                            <th colSpan="2"></th>
                            <th>{netBalance}</th>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>}
    </div>
}

export default VehicleDetails;