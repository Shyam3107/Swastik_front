const URL='https://cryptic-journey-86272.herokuapp.com'; //while deployment 
//const URL='http://localhost:5000'; // while running local

function postFetch(data,url){
    var submitbutton=document.querySelector("button[type='submit']");
    submitbutton.innerText='Please Wait ...';
    submitbutton.disabled=true;
    fetch(`${URL}/${url}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(res =>{
       // console.log(res);
        alert(res);
        submitbutton.innerText='Submit';
        submitbutton.disabled=false;
        window.location.reload();
    }).catch(err=> {
        alert(err);
        submitbutton.innerText='Submit';
        submitbutton.disabled=false;
    });
}

export default postFetch;