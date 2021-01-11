// READING EACH PLACE DEATILS
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import DateFilter, { DateSection, today } from './DateFilter';
import postFetch from './postFetch';
import exportTableToExcel from './exportTableToExcel';


function PlaceDetails(props) {
    const place = useParams().place; // get dynamic parameter
    var [{ detail, Balance }, setDetails] = useState({ detail: [], Balance: 0 });
    var [dateInterval, setDateInterval] = useState({
        From: today,
        To: today,
        details: detail
    });

    useEffect(() => {
        fetch(`${props.url}/Place/${place}`).then(resp => resp.json())
            .then(data => { setDetails(data); setDateInterval(dateInterval => ({ ...dateInterval, details: data.detail })); });
    }, [place, props.url]);

    function showInput() { // hide and show input box
        var inBal = document.getElementById('addBalance');
        if (inBal.style.display === "inline-block") {
            inBal.style.display = "none";
        } else {
            inBal.style.display = "inline-block";
        }
    }

    function AddIt() {  // add the current balance
        var bal = Number(document.getElementById('balance').value);
        var remarks = document.getElementById("remarks").value;
        var obj = {
            Date: new Date(),
            Place: place,
            Debit: bal,
            Remarks: remarks
        };
        if (bal === 0 || remarks === "") alert('Enter The detail');
        else postFetch(obj, "addBalance");
    }

    var netCredit = 0;
    var netDebit = 0;

    var data = DateFilter(dateInterval);

    return <div className='details-page'>
        <h2>{place}</h2><br />
        <h4 style={{ textAlign: 'center' }}>Current Balance : {Balance}<button onClick={showInput}>Add Balance</button></h4>
        <div id='addBalance' style={{ display: "none" }}>
            <input type='number' id='balance' placeholder='Enter The Amount' />
            <input type="text" id="remarks" placeholder="Enter Remarks" />
            <button onClick={AddIt} type='submit'>Add It</button>
        </div>
        <br />
        <DateSection setDateInterval={setDateInterval} />
        {data.length === 0 ? <div><h2>NO DATA FOUND FOR SELECTED DATE INTERVAL</h2></div> : <div>
            <button onClick={() => exportTableToExcel(
                'transact', place)}>
                Click to Export
            </button>
            <div className="tablediv">
                <table id="transact">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Vehicle No.</th>
                            <th>Debit</th>
                            <th>Credit</th>
                            <th>Remarks</th>
                        </tr>
                    </thead>
                    {data.map(function (info, index) {
                        info.Debit && (netDebit += info.Debit); // calculate net debit
                        info.Expenses && (netCredit += info.Expenses); // calculate net credit
                        var date = new Date(info.Date);
                        return <tbody key={index}>
                            <tr>
                                <td>{date.getDate()}-{date.getMonth() + 1}-{date.getFullYear()}</td>
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
                            <td></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        }
    </div>
}

export default PlaceDetails;