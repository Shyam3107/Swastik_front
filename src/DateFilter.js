
function DateFilter({From,To,details}){ // filter the data as per date interval
    var year=[Number(From.slice(0,4)) , Number(To.slice(0,4))];
    var month=[Number(From.slice(5,7)) , Number(To.slice(5,7))];
    var day=[Number(From.slice(8,10)) , Number(To.slice(8,10))];
    var from=new Date(year[0],month[0]-1,day[0]);
    var to=new Date(year[1],month[1]-1,day[1]);
    
    var filteredData = details.filter(function(data){
        day=new Date(data.Year,data.Month-1,data.Date);
        return day>=from && day<=to
    })
    return filteredData;
}

function DateSection({setDateInterval}){ // get Date interval to be filtered
    var day=new Date();
    var today=day.getFullYear()+'-'+(day.getMonth()+1)+'-';
    if(day.getDate()<10) today+='0'+day.getDate();
    else today+=day.getDate();

    function changeData(event){
        setDateInterval(data =>({
            ...data,
            [event.target.id]:event.target.value
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
export {DateSection};