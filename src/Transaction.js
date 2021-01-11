import { useState, useEffect } from 'react';
import DateFilter, { DateSection, today } from './DateFilter';
import EditData from './EditData';
import exportTableToExcel from './exportTableToExcel';


function Transaction(props) {
    var [detail, setDetails] = useState([]);
    var [dateInterval, setDateInterval] = useState({ // for filter data as per date
        From: today,
        To: today,
        details: detail
    });

    useEffect(() => {
        fetch(`${props.url}/Transactions`).then(resp => resp.json())
            .then(data => {
                setDetails(data);
                setDateInterval({ ...dateInterval, details: data });
            }).catch((err) => {
                alert('Failed to update, Try again')
            }
            );
    }, []);

    var name = dateInterval.From + ' to ' + dateInterval.To;
    var netRateAmt = 0;
    var netDiesel = 0;
    var netDieselCost = 0;
    var netExpenses = 0;
    var netBalance = 0;
    var netDebit=0;

    function printData(data, index) {
        var date = new Date(data.Date);
        data.RateCost && (netRateAmt += data.RateCost);
        data.Diesel && (netDiesel += data.Diesel);
        data.DieselCost && (netDieselCost += data.DieselCost);
        data.Expenses && (netExpenses += data.Expenses);
        data.Balance && (netBalance += data.Balance);
        data.Debit && (netDebit += data.Debit);
        
        return <tbody key={index}>
            <tr>
                <td>{date.getDate()}-{date.getMonth() + 1}-{date.getFullYear()}</td>
                <td>{data.Vehicle}</td>
                <td>{data.From}</td>
                <td>{data.To}</td>
                <td>{data.DIno}</td>
                <td>{data.Qty}</td>
                <td>{data.Rate}</td>
                <td>{data.RateCost}</td>
                <td>{data.Diesel}</td>
                <td>{data.DieselPrice}</td>
                <td>{data.DieselCost}</td>
                <td>{data.Expenses}</td>
                <td>{data.Place}</td>
                <td>{data.Remarks}</td>
                <td>{data.Debit}</td>
                <td>{data.Balance}</td>
            </tr>
        </tbody>
    }

    var data = DateFilter(dateInterval);

    return <div className='details-page'>
        {/* this function return filtered data as per date */}
        <DateSection setDateInterval={setDateInterval} />
        {data.length === 0 ? <h2>NO DATA FOUND FOR SELECTED DATE INTERVAL</h2> : <div>
            <button onClick={() => exportTableToExcel('transact', name)}>
                Click to Export
            </button>
            <div className="tablediv">
                <table id="transact">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Vehicle No.</th>
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
                            <th>Debit (Cash to place)</th>
                            <th>Balance</th>
                        </tr>
                    </thead>
                    {data.map(printData)}
                    <tbody>
                        <tr>
                            <th colSpan="7">Total</th>
                            <th>{netRateAmt}</th>
                            <th>{netDiesel}</th>
                            <th></th>
                            <th>{netDieselCost}</th>
                            <th>{netExpenses}</th>
                            <th colSpan="2"></th>
                            <th>{netDebit}</th>
                            <th>{netBalance}</th>
                        </tr>
                    </tbody>
                </table>
            </div>
            {/* <button type="submit" onClick={() => EditData(props.url)}>Submit</button> */}
        </div>}
    </div>
}

export default Transaction;