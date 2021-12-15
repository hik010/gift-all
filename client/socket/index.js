import {io} from 'socket.io-client';

let clientSocket;

if (process.env.NODE_ENV === 'production') {
	clientSocket = io();
} else {
	clientSocket = io('http://localhost:8090');
}

clientSocket.on('connect', () => {
  console.log('connected ', clientSocket.id)
});

export default clientSocket;
