const server = "https://spotim-demo-chat-server.herokuapp.com"
const room = "spotim/chat"; 

// USER DATA AND AUTHENTICATION
user = {
    userName: 'hi',
    password: 'he',
    imgUrl: 'https://new.com'
}
function saveUserProperty(property) {
    user[property] = property;
}

function authenticate() {
    return true
}

function saveUserDataToLocalStorage(){
    let locStorage = window.localStorage;
    const inputs = document.getElementsByTagName("input");
    for (const input of inputs) {
        saveUserProperty(input.value);
    }
    //save all input user data to localstorage for future use
    locStorage.setItem("username", (user.userName));
    locStorage.setItem("isAuthenticated", (true));
    locStorage.setItem("imgUrl", (user.imgUrl));
}

// POST-SUBMIT ACTIONS (HIDE THE FORM AND CREATE THE CHAT LOGIN BUTTON)

function hideForm(id){
    const form = document.getElementById(id);
    form.hidden = true;
}

let sendButton = function createButton() {
    const button = document.createElement("button")
    button.innerHTML = `Send Message`
    let div = document.getElementById("emitter")
    div.appendChild(button)
    return button;
}

// START SOCKET TO SPOTIM ROOM
function connect(){
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

// POST-SUBMIT EXECUTION : LISTEN FOR THE FORM SUBMIT, THEN RUN AUTHENTICATION, STORAGE, HIDE FORM, CREATE BUTTON AND LAUNCH SOCKET
document.addEventListener("submit", () => {
    authenticate();
    saveUserDataToLocalStorage();
    hideForm('login');   
    connect()
    sendButton();
    sendButton.addEventListener('click', () => {
      console.log('hi')  ;
    })
     
})
