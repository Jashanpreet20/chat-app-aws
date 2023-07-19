const groupname=document.getElementById('groupname');
groupname.addEventListener('click',(e)=>{
    e.preventDefault();
    window.location='http://127.0.0.1:5500/views/group.html';
})

document.addEventListener('DOMContentLoaded',async(e)=>{
    e.preventDefault();
    const token=localStorage.getItem('token');
    await axios.get('http://localhost:3000/fetch-group',{headers:{'Authorization':token}}).then(result=>{
        console.log(result.data.details);
        const groups = result.data.details;
        for(let group of groups){
            findGroup(group);
        }
    })
})

async function findGroup(group){
    let groups = document.getElementById('groups');
    let groupButton = document.createElement('button');
    groupButton.innerHTML=group.groupName + " id: " + group.id;
    const buttonid=group.id;
    groupButton.id=buttonid;
    groups.appendChild(groupButton);
    localStorage.setItem('group',0);
    groupButton.onclick=(event)=>{
        clearButtons();
        event.preventDefault();
        const clickedButtonId = event.target.id;
        localStorage.setItem('group',clickedButtonId);
        const tokenId = localStorage.getItem('token');
        const messageContainer=document.getElementById('adduserbuttonContainer');


        //add user button
        const adduserButton=document.createElement('button');
        adduserButton.innerHTML= 'Add-user in '+group.groupName;
        messageContainer.appendChild(adduserButton)
        adduserButton.onclick=(event)=>{
            event.preventDefault();
            const url = `http://127.0.0.1:5500/views/group.html?id=${clickedButtonId}&token=${tokenId}`;
            window.open(url);
        }

        // remove user button 
        const removeuserbutton=document.createElement('button')
        removeuserbutton.innerHTML='Romeove from '+group.groupName;
        removeuserbutton.style.background='red';
        messageContainer.appendChild(removeuserbutton);
        removeuserbutton.onclick=(event)=>{
            event.preventDefault();
            const removeUrl=`http://127.0.0.1:5500/views/group.html?id=${clickedButtonId}&token=${tokenId}`;
            window.open(removeUrl);
        }
        
        //can make another member admin
        // const adminbutton=document.createElement('button');
        // adminbutton.innerHTML='add admin '+group.id;
        // adminbutton.style.background='green';
        // messageContainer.appendChild(adminbutton);
        // adminbutton.onclick=(event)=>{
        //     event.preventDefault();
        //     const addAdminUrl=`../admin/admin.html?id=${clickedButtonId}&token=${tokenId}`;
        //     window.open(addAdminUrl);
        // };

        //message box to send messages to group
        const messageSenderForm=document.getElementById('footer-input');
        messageSenderForm.style.display='flex';
        sendmessage(group.id);
        showmessage(group.id);
    }
}

async function clearButtons() {
    const buttonDiv = document.getElementById('adduserbuttonContainer');
    const buttons = buttonDiv.getElementsByTagName('button');

    // Remove each button from the div
    while (buttons.length > 0) {
        buttonDiv.removeChild(buttons[0]);
    }
}
  


async function sendmessage(groupid){
    const messageButton = document.getElementById('messageButton');

    messageButton.addEventListener('click',async(e)=>{
        // const sendergroupid=groupid;
        e.preventDefault();
        const message=document.getElementById('message').value;
        document.getElementById('message').value=null;
        console.log(message)
        const token = localStorage.getItem('token')
        await axios.post('http://localhost:3000/message',{message:message,groupid:groupid},{headers:{'Authorization':token}}).then(response=>{
            console.log(response);
        }).catch((err)=>{
            console.log(err);
        })
        
    });
}

//change starts here


async function showmessage(groupid){
    const token = localStorage.getItem('token');
    let start=0;
    console.log(start);
    await axios.get(`http://localhost:3000/allreply?start=${start}&group=${groupid}`,{headers:{'Authorization':token}}).then(response=>{
        console.log(response);
        const backData=response.data.message;
        localStorage.setItem('messages',JSON.stringify(backData));
        const replies = JSON.parse(localStorage.getItem('messages'));
        console.log(replies)
        const group=Number(localStorage.getItem('group'));
        console.log(group,typeof(group))
        
        for(reply of replies){
            if(reply.groupId===group){
                show(reply);
            }
        }
    
    });
    lastmessage(groupid);
}

async function show(reply){
        const messageBox=document.getElementById('message-container');
        const mesageshow = document.createElement('div');
        mesageshow.innerHTML=`<h3 id="reply">${reply.user.name}:${reply.message}</h3>`
        const { width } = mesageshow.getBoundingClientRect();
        mesageshow.style.width = `${width}px`;
        mesageshow.style.whiteSpace = 'nowrap';
        messageBox.appendChild(mesageshow);
}

async function lastmessage(groupid){
    setInterval(async()=>{
        const localfullmessage=JSON.parse(localStorage.getItem('messages'));
        console.log(localfullmessage);
        console.log(localfullmessage[localfullmessage.length-1]);
        const locallastmessageid=localfullmessage[localfullmessage.length-1].id;
        console.log(locallastmessageid)
        const group=parseInt(localStorage.getItem('group'))
        console.log(group);
        const token=localStorage.getItem('token');
    // setInterval(async()=>{
        const dblastmessage=await axios.get(`http://localhost:3000/lastmessage?group=${group}`,{headers:{'Authorization':token}});
        console.log(dblastmessage);
        const flag=compareObjects(locallastmessageid,dblastmessage.data.id);
        console.log('compare',locallastmessageid,dblastmessage.data.id)
        console.log(flag);
        if(flag===false){
            const final=localfullmessage.concat(dblastmessage.data);
            console.log(final);
            localStorage.setItem('messages',JSON.stringify(final));
            showafter(dblastmessage);
        }
    },2000)
}


function compareObjects(obj1, obj2) {
    if(obj1!=obj2){
        return false;
    }
  
    return true;
  }

  async function showafter(dblastmessage){
        console.log('show after calling')
        const messageBox=document.getElementById('message-container');
        const mesageshow = document.createElement('div');
        mesageshow.innerHTML=`<h3 id="reply">${dblastmessage.data.user.name}:${dblastmessage.data.message}</h3>`
        mesageshow.style.color='rgb(235, 231, 34)';
        const { width } = mesageshow.getBoundingClientRect();
        mesageshow.style.width = `${width}px`;
        mesageshow.style.whiteSpace = 'nowrap';
        messageBox.appendChild(mesageshow);
  }