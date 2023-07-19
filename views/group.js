

var userlist=document.getElementById('userlist');
var grouplist=document.getElementById('grouplist');
var addmessage=document.getElementById('addmessage');
const button = document.getElementById('adduser');
var removeuser = document.getElementById('removeuser');
var chatpage=document.getElementById('chatpage');
window.addEventListener('DOMContentLoaded',getuser);
window.addEventListener('DOMContentLoaded',fetchGroup);
addmessage.addEventListener('submit',createGroup);
const token=localStorage.getItem('token');
const groupId=localStorage.getItem('group');


chatpage.addEventListener('click', () =>{
    window.location='http://127.0.0.1:5500/views/chat.html';
})

async function getuser(e){
    e.preventDefault();

    const data=axios.get('http://localhost:3000/get-user',  { headers: { 'Authorization': token } } )
    .then(res =>{
        if(data){
            for(var i=0; i<res.data.allUser.length; i++){
                
                var li=document.createElement('li');
                li.appendChild(document.createTextNode('user-name=' + res.data.allUser[i].name));
                userlist.append(li);
                
            }
           
        }
          else{
            console.log('something went wrong data userlist not fetched')
          }
    })
    .catch(err =>{
        console.log('data not fetched' + err);
    })
}

function createGroup(e) {
    e.preventDefault();
   // console.log(1);
    const user = {
        message: e.target.message.value    
    }
    console.log(user);
   axios
    .post("http://localhost:3000/create-group", user,{headers:{'Authorization':token}})
   .then(res =>{
   // localStorage.setItem('groupId',res.data.details.id);
    console.log('groupid='+res.data.details.id);
    console.log(('data added'))
    
})
   .catch(err=>console.log(err));
    //console.log(user);

addmessage.reset();
}

async function fetchGroup(e) {
    e.preventDefault();
    const data= axios.get('http://localhost:3000/fetch-group',  { headers: { 'Authorization': token } } )
    .then(res =>{
        if(data){
            for(var i=0; i<res.data.details.length; i++){
                var li=document.createElement('li');
                li.appendChild(document.createTextNode('group-name=' + res.data.details[i].groupName));
                var deleteBtn = document.createElement('button');
                deleteBtn.appendChild(document.createTextNode('Join'));
                li.appendChild(deleteBtn);
                var btnEdit = document.createElement('button');
                btnEdit.appendChild(document.createTextNode('Chat'));
                li.appendChild(btnEdit);
                grouplist.append(li);
            }
           
        }
          else{
            console.log('something went wrong data userlist not fetched')
          }
    })
    .catch(err =>{
        console.log('data not fetched' + err);
    })
}





button.addEventListener('click',async(event)=>{
    event.preventDefault();
    const groupid=localStorage.getItem('group');
    const user={
        grp:document.getElementById('userid').value
    }

    await axios.post(`http://localhost:3000/adduser?groupid=${groupid}`,user,{headers:{'Authorization':token}}).then(result=>{
        console.log(result);
        alert(result.data.message);
    }).catch(err=>{
        console.log(err);
        alert(err.response.data.message+' go back to the chat page');
    })
})



removeuser.addEventListener('click',async(event)=>{
    event.preventDefault();
    const groupid=localStorage.getItem('groupId');
    const userid=document.getElementById('removeuserid').value;

    await axios.delete(`http://localhost:3000/removeuser?groupid=${groupid}&deleteid=${userid}`,{headers:{'Authorization':token}}).then(result=>{
        console.log(result);
        alert(result.data.message);
    }).catch(err=>{
        console.log(err);
        alert(err.response.data.message+' go back to the chat page');
    })
})