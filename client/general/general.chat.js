const socket = io('http://localhost:3000');
const messages = document.getElementById('messages');
const message = document.getElementById('input');
const form = document.getElementById('form');

const userIdInput = document.getElementById('userIdInput');
const userIdForm = document.getElementById('userId');
// let userId = 1;

userIdForm.addEventListener('submit', (event) => {
  event.preventDefault();
  socket.emit('getUsersId', (data) => {
    data.includes(Number(userIdInput.value))
      ? userId = userIdInput.value
      : alert('Your userId not corect.');
  });
});

let generalChatId;
socket.emit('getGeneralChatId', (data) => {
  generalChatId = data;
});

form.addEventListener('submit', (event) => {
  event.preventDefault();
  userId = userIdInput.value;
  console.log(userId);
  userId
    ? socket.emit('newMessage', {
        chatId: generalChatId,
        message: message.value,
        userId: userId,
      })
    : {};
});

socket.on('connect', function () {

  socket.emit('getMessages', { chatId: generalChatId }, (data) => {
    data.forEach((element) => {
      addMessageToLi(element);
    });
  });

  console.log('Connected');
});

socket.on('newMessage', function (data) {
  addMessageToLi(data);
});

socket.on('disconnect', function () {
  console.log('Disconnected');
});

function addMessageToLi(data) {
  const elem = document.createElement('li');
  elem.innerHTML = `${data.user.id}: ${data.text}`;
  messages.appendChild(elem);
}
