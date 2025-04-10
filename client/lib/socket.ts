import { Client, IMessage } from '@stomp/stompjs';

let client: Client | null = null;

export const connectSocket = (
  roomId: string,
  onMessage: (message: IMessage) => void,
  onConnect?: () => void
) => {
  client = new Client({
    brokerURL: process.env.NEXT_PUBLIC_SOCKET_URL || 'ws://localhost:8080/websocket',
    reconnectDelay: 5000,
    onConnect: () => {
      client?.subscribe(`/topic/${roomId}`, onMessage);
      onConnect?.();
    },
    debug: (str) => console.log(str),
  });
  client.activate();
};

export const sendMessageSocket = (roomId: string, message: any) => {
  client?.publish({
    destination: `/app/chat/${roomId}`,
    body: JSON.stringify(message),
  });
};

export const disconnectSocket = () => {
  client?.deactivate();
  client = null;
};