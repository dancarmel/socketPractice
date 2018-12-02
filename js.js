

const spotIMServer = "https://spotim-demo-chat-server.herokuapp.com"
const spotIMChannel = (`${spotIMServer}/chat`)
console.log(`connecting to ${spotIMChannel}`)

const socket = io(spotIMChannel);






user = {
    userName:'hi',
    password:'he',
    imgUrl:'https://new.com'
    
}

let locStorage = window.localStorage;


function saveUser(name,pass,img){
    user.userName = name;
    user.password = pass;
    user.imgUrl = img;
} 

function authenticate(){
    return true
}


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
    sendMessage();
}
function listen(){

    socket.on('*',(event)=>{
        socket.send('hello')
        console.log(event);
        console.log('hello')
    })
}
function sendMessage(){
    emissionObject ={
        currentName:user.userName,
        currentImg:user.imgUrl,
        date:new Date().getTime,
        message:"hello world"
    }
    socket.emit(emissionObject)
}