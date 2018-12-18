const server = "https://spotim-demo-chat-server.herokuapp.com"
const room = "spotim/chat"; 

// USER DATA AND AUTHENTICATION
let user = {
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

function createImage(imageUrl){
    let img = document.createElement("img");
    img.src = imageUrl;
    return img;
}

// POST-SUBMIT ACTIONS (HIDE THE FORM AND CREATE THE CHAT LOGIN BUTTON)

function hideForm(id){
    const form = document.getElementById(id);
    form.hidden = true;
}

function createButton() {
    const button = document.createElement("button")
    button.innerHTML = `Send Message`
    let div = document.getElementById("emitter")
    div.appendChild(button)
    return button;
}

function createInputField() {
    const inputField = document.createElement("input")
    inputField.setAttribute("id","userinput")
    inputField.value = `type here`
    const div = document.getElementById("emitter")
    div.appendChild(inputField)
    return inputField;
}
function createChatBox() {
    const chatbox = document.createElement("div")
    chatbox.setAttribute("id","chat")
    const div = document.getElementById("emitter")
    div.appendChild(chatbox)
    const br = document.createElement("br");
    div.appendChild(br);
    return chatbox;
}

// START SOCKET TO SPOTIM ROOM
function connect(){
    const socket = io(server);
    socket.on('connect', ()=>{
        console.log('connected')
    })

    emissionObject ={
        currentName:user.userName,
        currentImg:user.imgUrl,
        date:new Date().getTime,
        message:"hello world"
    }
    socket.on(room, (message)=>{
        console.log(`${user.username}: ${user.imgUrl}: ${message}`)
        textLine = document.createElement("li")
        textLine.innerText = `${user.username}: ${message}`
        chatbox.appendChild(textLine);
        let image = createImage(user.imgUrl)
        chatbox.appendChild(image)
    })  ;

    return socket;
}

// POST-SUBMIT EXECUTION : LISTEN FOR THE FORM SUBMIT, THEN RUN AUTHENTICATION, STORAGE, HIDE FORM, CREATE BUTTON AND LAUNCH SOCKET
document.addEventListener("submit", () => {
    authenticate();
    saveUserDataToLocalStorage();
    hideForm('login');   
    let connection = connect();
    chatbox = createChatBox();
    let textInput = createInputField();
    let sendButton = createButton();
    sendButton.addEventListener('click', () => {
        connection.emit(room, textInput.value)
        })  ;
    })

//Chat UI
