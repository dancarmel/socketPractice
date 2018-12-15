const server = "https://spotim-demo-chat-server.herokuapp.com"
const room = "spotim/chat"; 



/// user related code

user = {
    userName: 'hi',
    password: 'he',
    imgUrl: 'https://new.com'
}
function saveUser(name, pass, img) {
    user.userName = name;
    user.password = pass;
    user.imgUrl = img;
}

function authenticate() {
    return true
}

function saveUserDataToLocalStorage(){
    let locStorage = window.localStorage;
    const inputs = document.getElementsByTagName("input");
    saveUser(inputs[0].value, inputs[1].value, inputs[2].value);
    //save all input user data to localstorage for future use
    locStorage.setItem("username", (user.userName));
    locStorage.setItem("isAuthenticated", (true));
    locStorage.setItem("imgUrl", (user.imgUrl));
}

// enable to log into chat and message room

function hideForm(id){
    const form = document.getElementById(id);
    form.hidden = true;
}

function createButton() {
    const newButton = document.createElement("button")
    newButton.innerHTML = `Click Here to Emit`
    let div = document.getElementById("emitter")
    div.appendChild(newButton)
    newButton.addEventListener('click', () => {
        launchSocket();
    })
}

// socket related code
function launchSocket(){
    const socket = io(server);
    socket.on('connect', ()=>{
        console.log('connected')
        socket.emit(room, emissionObject)
    })

    emissionObject ={
        currentName:user.userName,
        currentImg:user.imgUrl,
        date:new Date().getTime,
        message:"hello world"
    }

    socket.on(room, (message)=>{
        console.log(`message: ${message}`)
    })
}


// emissionObject ={
//         currentName:user.userName,
//         currentImg:user.imgUrl,
//         date:new Date().getTime,
//         message:"hello world"
//     }

document.addEventListener("submit", () => {
    authenticate();
    saveUserDataToLocalStorage();
    hideForm('login');   
    createButton();
     
})
