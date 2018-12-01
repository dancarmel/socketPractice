// import io from 'socket.io-client';
console.log('gelo')
const spotIMServer = "https://spotim-demo-chat-server.herokuapp.com"
const spotIMChannel = (`${spotIMServer}/chat`)
console.log(`connecting to ${spotIMChannel}`)
// const socket = io(spotIMChannel)(console.log(`connected to ${spotIMChannel}`));
const socket = io(spotIMChannel);
console.log(socket)
socket.emit("hello world",(data) => {
    console.log(data); 
  });
// socket.on("")