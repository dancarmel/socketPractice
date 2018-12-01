// import io from 'socket.io-client';
console.log('gelo')
const spotIMServer = "https://spotim-demo-chat-server.herokuapp.com"
const spotIMChannel = (`${spotIMServer}/chat`)
console.log(`connecting to ${spotIMChannel}`)
// const socket = io(spotIMChannel)(console.log(`connected to ${spotIMChannel}`));
const socket = io(spotIMChannel);

user = {
    userName:'hi',
    password:'he',
    imgUrl:'https://new.com'
    
}

function saveUser(userName,password,imgUrl){
    userName = user.userName;
    password = user.password;
    imgUrl = user.imgUrl;
    console.log(user)

} 


document.addEventListener("submit", ()=>{
    console.log("hi");
    const form = document.getElementById("login");
    const inputs = document.getElementsByTagName("input");
    userArray = []
    for(i in inputs){
        userArray.push(i);
    }
    saveUser(userArray[0],userArray[1], userArray[2]);
    console.log(user)
    form.hidden = true  
})
