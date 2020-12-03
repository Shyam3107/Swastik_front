// READING ALL VEHICLE NUMBER
import {useState , useEffect} from 'react';
import {Link} from 'react-router-dom';
import Transaction from './Transaction';

function Home(props){
    var filData=[];

    var [detail,setDetails]=useState({
        dataOf:'vehicle',
        vehicleData:[],
        placeData:[],
        filtered:[]
    });

    useEffect(()=>{
            fetch(`${props.url}/Place`).then(res => res.json()).then(data=>{
                setDetails(detail=>({
                    ...detail,
                    placeData:data
                }))
            }).catch(err=>alert(err));
            fetch(`${props.url}/Vehicle`).then(res => res.json()).then(data=>{
                setDetails(detail=>({
                    ...detail,
                    vehicleData:data,
                    filtered:data
                }))
            }).catch(err=>alert(err));
    },[props.url]);

    function filterData(event){ // search specific data
        filData=detail[detail.dataOf+'Data'].filter(function(d){
            return d.includes(event.target.value.toUpperCase());
        })
        
        setDetails({
            ...detail,
            filtered:filData
        })
    }

    function changeData(event){ // change data vehicle or place
        var value=event.target.id;
        setDetails({
            ...detail,
            dataOf:value,
            filtered:detail[value+'Data']
        });
    }

    return <div><div className='home-page'>
        <div className='data-toggle'>
            <input type='radio' name='data' id='vehicle' onClick={changeData} defaultChecked/>
            <label htmlFor='vehicle'>Vehicle</label>
            <input type='radio' name='data' id='place' onClick={changeData} />
            <label htmlFor='place'>Petty CashBook</label>
            <input type='radio' name='data' id='date' onClick={changeData} />
            <label htmlFor='date'>Date</label>
        </div>
        {detail.dataOf!=='date'&&<div>
        <input type='search' onChange={filterData} name={detail.dataOf} /><br />
        {detail.filtered.map(function(info,index){  // use ` , not ' for link
           return (
           <Link key={index} to={`/${detail.dataOf}/${info}`}><h3>{info}</h3></Link> 
           )
        })}
        </div>}
    </div>
    {detail.dataOf==='date'&&<Transaction url={props.url} />}
    </div>
}

export default Home;