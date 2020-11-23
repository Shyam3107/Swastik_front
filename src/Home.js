// READING ALL VEHICLE NUMBER
import {useState , useEffect} from 'react';
import {Link} from 'react-router-dom';

function Home(){
    var filData=[];
    var [detail,setDetails]=useState({
        dataOf:'vehicle',
        vehicleData:[],
        placeData:[],
        filtered:[]
    }); 

    useEffect(function(){ // to run it once in lifecycle
        
    async function fetchData(){  // accesing vehicle data from backend
        var Vdata= await fetch('https://cryptic-journey-86272.herokuapp.com/Vehicle').then(response=>response.json());
        var Pdata= await fetch('https://cryptic-journey-86272.herokuapp.com/Place').then(response=>response.json());
        setDetails(detail=> ({
           ...detail,
           vehicleData: Vdata,
           filtered: Vdata,
           placeData: Pdata
       }));
       }
        fetchData();
    },[])

    
    function filterData(event){
        if(detail.dataOf==='vehicle'){
            filData=detail.vehicleData.filter(function(d){
                return d.includes(event.target.value.toUpperCase());
            })
        }
        else {
            filData=detail.placeData.filter(function(d){
                return d.includes(event.target.value.toUpperCase());
            })
        }
        
        setDetails({
            ...detail,
            filtered:filData
        })
    }

    function changeData(event){
        var d=event.target.id;
        if(d==='vehicle') setDetails({
            ...detail,
            dataOf: 'vehicle',
            filtered:detail.vehicleData
        })
        else setDetails({
            ...detail,
            dataOf:'place',
            filtered: detail.placeData
        })
    }
    return <div className='home-page'>
        <div className='data-toggle'>
            <input type='radio' name='data' id='vehicle' onClick={changeData} defaultChecked/>
            <label htmlFor='vehicle'>Vehicle</label>
            <input type='radio' name='data' id='place' onClick={changeData} />
            <label htmlFor='place'>Place</label>
        </div>
        <input type='search' onChange={filterData} name={detail.dataOf} /><br />
        {detail.filtered.map(function(info,index){  // use ` , not ' for link
           return (
           <Link key={index} to={`/${detail.dataOf}/${info}`}><h3>{info}</h3></Link> 
           )
        })}
    </div>
}

export default Home;