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

// import io from 'socket.io-client';

const spotIMServer = "https://spotim-demo-chat-server.herokuapp.com"
const spotIMChannel = (`${spotIMServer}/chat`)
console.log(`connecting to ${spotIMChannel}`)
// const socket = io(spotIMChannel)(console.log(`connected to ${spotIMChannel}`));
const socket = io(spotIMChannel);


// LOG IN


//USER OBJECT WITH USER PROPERTIES
user = {
    userName: 'hi',
    password: 'he',
    imgUrl: 'https://new.com'

}

let locStorage = window.localStorage;

// function that overrides the user object values
function saveUser(name, pass, img) {
    user.userName = name;
    user.password = pass;
    user.imgUrl = img;
}
//authentication
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

    //hide form
    const form = document.getElementById("login");
    form.hidden = true
    //create button
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
    listen();
    myEmitter();
    console.log("finished function")
}
function listen() {
    console.log("setting up listener")
    /*
    OREN: this is a DOM event listener. what we want is a socket-IO listener.
    we want to register the socket to events in our chat room, not register for events in our browser
    (im actually surprised this didn't throw any errors)
    take a look at socket-io's "on" function
    */

    socket.addEventListener('*', (event) => {
        console.log(event);
    })
}

//OREN: bad function name, consider names such as "sendMessage" to make your code clear
// and also to help you understand what you're trying to achieve
function myEmitter() {
    emittionObject = {
        currentName: user.userName,
        currentImg: user.imgUrl,
        date: new Date(),//OREN: this is not a timestamp but a date object. in general this can be fine to send but right now we want to avoid it. you're emitting an object to an unknown server
        //that might be written in any language, and a number is more likely to cause issues than a javascript object. 
        message: "hello world"
    }
    socket.emit(emittionObject)
}