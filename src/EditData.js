function EditData(url){
    var editData={};
        var x=document.querySelectorAll('.dieselPrice')
        x.forEach(item=>{
            editData[item.id]=Number(item.innerHTML);
        })
        fetch(`${url}/editData`,{  // send edited table details to backend
            method:'PUT',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(editData)
        }).then(resp => resp.json())
        .then(data=>{
            alert(data);
        }).catch((err)=>{
            alert(err);
        });
}

export default EditData;