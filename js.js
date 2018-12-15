/*
===================================
            ASSIGNMENT
===================================
1. remove all useless comments  (old code, obvious comments)
2. remove all useless console(log)s - the more you log, the less your logs mean.
3. go through and make fixes in accordance with my comments in the file
4. fix (listen, myEmitter) functions to send and listen to events on our websocket
5. to get an idea if your code is working, expect to see your own event logged in console
    when clicking the button
*/




user = {
    userName: 'hi',
    password: 'he',
    imgUrl: 'https://new.com'

}

let locStorage = window.localStorage;

function saveUser(name, pass, img) {
    user.userName = name;
    user.password = pass;
    user.imgUrl = img;
}

function authenticate() {
    return true
}

// form submittion event will save all input values in local storage and pass them to user object
document.addEventListener("submit", () => {
    //get all input elements
    const inputs = document.getElementsByTagName("input");
    //authenticate
    authenticate();
    //save each input to the corresponding property
    saveUser(inputs[0].value, inputs[1].value, inputs[2].value);
    //save all input user data to localstorage for future use
    locStorage.setItem("username", (user.userName));
    locStorage.setItem("isAuthenticated", (true));
    locStorage.setItem("imgUrl", (user.imgUrl));

    const form = document.getElementById("login");
    form.hidden = true    
    createButton();
})

function createButton() {
    const newButton = document.getElementById('emitter')
    newButton.innerHTML = `<button id="emitter">Click Here to Emit</button>`
    newButton.addEventListener('click', () => {
        emitButton();
    })

}
function emitButton() {
    // listen();
    // sendMessage();
    const spotIMServer = "https://spotim-demo-chat-server.herokuapp.com"
    // const spotIMChannel = (`${spotIMServer}spotim/chat`)
    // console.log(`connecting to ${spotIMChannel}`)
    const socket = io.connect(spotIMServer);
    const room = "/spotim/chat";   
    socket.on('connect',room,()=>{
        console.log('hello')
        })
    socket.emit('message',room,(data)=>{
        console.log(data)
    })}

function sendMessage(){
    emissionObject ={
        currentName:user.userName,
        currentImg:user.imgUrl,
        date:new Date().getTime,
        message:"hello world"
    }
    socket.emit(emissionObject)
}