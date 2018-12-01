/*
===================================
            ASSIGNMENT
===================================
1. remove all useless comments  (old code, obvious comments)
2. remove all useless console(log)s - the more you log, the less your logs mean.

*/

// import io from 'socket.io-client';
console.log('gelo')
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

})
