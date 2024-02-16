// Retrieve the port from the server URL, as provided by the deployment environment
const socketUrl = new URL(window.location.origin);
const socketPort = socketUrl.port || process.env.PORT || 8000; // Use environment variable or default to 8000

// Create the Socket.IO connection using the dynamically determined port
const socket = io(`http://${socketUrl.hostname}:${socketPort}`);

// ... rest of your client-side code remains the same ...

// Example usage:

// Fetching the actual port at runtime (optional)
socket.on('connect', () => {
  const actualPort = socket.io.engine.port;
  console.log(`Connected to server on port ${actualPort}`); // For debugging or logging
});


const form = document.getElementById('send-container');
const MessageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector(".container");
var audio = new Audio('ram.mp3')
const append = (message, position)=>{
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
   
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position=='left'){
      audio.play();
    }
  
}
form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const message= MessageInput.value;
    append(`you: ${message}`, `right`);
    socket.emit(`send`, message);
    messageInput.value = ''

})
const name = prompt("Enter your name to join ");
socket.emit('new-user-joined', name)

socket.on('user-joined', name => {
append(`${name} joined the chat`, 'right');
  });
  socket.on('receive', data =>{
    append(`${data.name}: ${data.message}`, `left`)
  })
  socket.on('left', name=>{
    append(`${name} left the chat`, `left`)
  })
