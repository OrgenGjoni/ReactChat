import io from 'socket.io-client';

const SERVER = process.env.REACT_APP_SERVER_ADDRESS;
const socket = io( SERVER);

export default socket;
