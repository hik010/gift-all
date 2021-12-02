import {io} from 'socket.io-client';

let clientSocket;

if (process.env.NODE_ENV === 'production') {
	clientSocket = io();
} else {
	clientSocket = io('http://localhost:8090');
}

clientSocket.on('connect', () => {
  console.log('here')
});

export default clientSocket;
