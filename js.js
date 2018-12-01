// import io from 'socket.io-client';

const spotIMServer = "https://spotim-demo-chat-server.herokuapp.com"
const spotIMChannel = (`${spotIMServer}/chat`)
console.log(`connecting to ${spotIMChannel}`)
// const socket = io(spotIMChannel)(console.log(`connected to ${spotIMChannel}`));
const socket = io(spotIMChannel);


// LOG IN


//USER OBJECT WITH USER PROPERTIES
user = {
    userName:'hi',
    password:'he',
    imgUrl:'https://new.com'
    
}

let locStorage = window.localStorage;

// function that overrides the user object values
function saveUser(name,pass,img){
    user.userName = name;
    user.password = pass;
    user.imgUrl = img;
} 
//authentication
function authenticate(){
    return true
}

// form submittion event will save all input values in local storage and pass them to user object
document.addEventListener("submit", ()=>{    
    //get all input elements
    const inputs = document.getElementsByTagName("input");
    //authenticate
    authenticate();
    //save each input to the corresponding property
    saveUser(inputs[0].value,inputs[1].value,inputs[2].value);
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

function createButton(){
    const newButton = document.getElementById('emitter')
    newButton.innerHTML = `<button id="emitter">Click Here to Emit</button>`
    newButton.addEventListener('click',()=>{
        emitButton();
    })
    
}
function emitButton(){
    listen();
    myEmitter();
    console.log("finished function")
}
function listen(){
    console.log("setting up listener")
    socket.addEventListener('*',(event)=>{
        console.log(event);
    })
}
function myEmitter(){
    emittionObject ={
        currentName:user.userName,
        currentImg:user.imgUrl,
        date:new Date(),
        message:"hello world"
    }
    socket.emit(emittionObject)
}