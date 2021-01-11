var day = new Date();
var today = day.getFullYear() + '-'; // get today date
var month = day.getMonth() + 1;
if (month < 10) today += '0' + month;
else today += month;
today += '-'
if (day.getDate() < 10) today += '0' + day.getDate();
else today += day.getDate();

day.setDate(day.getDate() - 1); // to get yesterday date
var yesterday = day.getFullYear() + '-';
month = day.getMonth() + 1;
if (month < 10) yesterday += '0' + month;
else yesterday += month;
yesterday += '-';
if (day.getDate() < 10) yesterday += '0' + day.getDate();
else yesterday += day.getDate();

function DateFilter({ From, To, details }) { // filter the data as per date interval
    var from=new Date(From);
    var to=new Date(To);
    to.setHours(23,59,59,999);
    return details.filter(function (data) {
        var date=new Date(data.Date);
        return date>=from && date<=to;
    });
}

function DateSection({ setDateInterval }) { // get Date interval to be filtered
    
    function changeData(event) {
        setDateInterval(data => ({
            ...data,
            [event.target.id]: event.target.value
        }))
    }

    return <div className="date-section">
        <label htmlFor="From">From : </label>
        <input id="From" type="Date" defaultValue={today} max={today} onChange={changeData} ></input>
        <label htmlFor="To">To : </label>
        <input id="To" type="Date" defaultValue={today} max={today} onChange={changeData} ></input>
    </div>
}


export default DateFilter;
export { DateSection, today, yesterday };