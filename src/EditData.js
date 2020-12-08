import postFetch from './postFetch';

function EditData(){
    var editData={};
        var x=document.querySelectorAll('.dieselPrice')
        x.forEach(item=>{
            editData[item.id]=Number(item.innerHTML);
        });
        postFetch(editData,"editData");
        window.location.reload();
}

export default EditData;