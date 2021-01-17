// READING ALL VEHICLE NUMBER
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Transaction from './Transaction';
import postFetch from './postFetch';

function Home(props) {
    var filData = [];
    var err_mssg = "Failed To fetch. Either reload the page or try after some Time";

    var [detail, setDetails] = useState({
        dataOf: 'vehicle',
        vehicleData: [],
        placeData: [],
        filtered: []
    });

    var [status, setStatus] = useState("Loading...");

    useEffect(() => {
        fetch(`${props.url}/Place`).then(res => res.json()).then(data => {
            setDetails(detail => ({
                ...detail,
                placeData: data
            }));
            setStatus("Loaded")
        }).catch(err => setStatus(err_mssg));
        fetch(`${props.url}/Vehicle`).then(res => res.json()).then(data => {
            setDetails(detail => ({
                ...detail,
                vehicleData: data,
                filtered: data
            }))
            setStatus("Loaded");
        }).catch(err => setStatus(err_mssg));
    }, [props.url, err_mssg]);

    function filterData(event) { // search specific data
        filData = detail[detail.dataOf + 'Data'].filter(function (d) {
            return d.includes(event.target.value.toUpperCase());
        })

        setDetails({
            ...detail,
            filtered: filData
        })
    }

    function changeData(event) { // change data vehicle or place
        var value = event.target.id;
        setDetails({
            ...detail,
            dataOf: value,
            filtered: detail[value + 'Data']
        });
    }

    function addNewPlace() { // add new place with corresponding data
        var amount = Number(prompt("Enter the Balance"));
        if (amount) {
            var place = prompt("Enter the Place");
            if (place) {
                place = place.toUpperCase();
                if (amount === 0 || place === "") alert("Enter correct information");
                else postFetch({ "Date": new Date(), "Place": place, "Debit": amount, "Remarks": "Opening Balance" }, "addPlace");
            }
        }
    }

    return <div><div className='home-page'>
        <div className='data-toggle'>
            <input type='radio' name='data' id='vehicle' onClick={changeData} defaultChecked />
            <label htmlFor='vehicle'>Vehicle</label>
            <input type='radio' name='data' id='place' onClick={changeData} />
            <label htmlFor='place'>Petty CashBook</label>
            <input type='radio' name='data' id='date' onClick={changeData} />
            <label htmlFor='date'>Date</label>
        </div>
        {detail.dataOf !== 'date' && <div>
            <input type='search' onChange={filterData} name={detail.dataOf} /><br />
            {status !== "Loaded" ? <h3>{status}</h3> : (detail.filtered.length === 0 ? <h3>NO DATA TILL NOW</h3> :
                detail.filtered.map(function (info, index) {  // use ` , not ' for link
                    return (<div key={index} >
                        <Link to={`/${detail.dataOf}/${info}`}>
                            <img src={detail.dataOf === "place" ? "./location.png" : "./truck1.png"} alt="Truck img" />
                            <h3>{info}</h3></Link>
                    </div>
                    )
                }))}
        </div>}
        {detail.dataOf === "place" && <button type="submit" onClick={addNewPlace}>Add New Place</button>}
    </div>
        {detail.dataOf === 'date' && <Transaction url={props.url} />}
    </div>
}

export default Home;