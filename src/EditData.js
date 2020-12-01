function EditData(url){
    var editData={};
        var x=document.querySelectorAll('.dieselPrice')
        x.forEach(item=>{
            editData[item.id]=Number(item.innerHTML);
        })
        console.log(editData);
        fetch(`${url}/editData`,{  // send edited table details to backend
            method:'PUT',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(editData)
        }).then(resp => resp.json())
        .then(data=>{
            if(data) alert('added successfully');
            else alert('Failed, Try again');
        })
}

export default EditData;