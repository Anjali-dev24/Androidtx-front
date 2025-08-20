import { io, Socket } from "socket.io-client";

const SOCKET_URL = "wss://9tx.online";

interface Wallet {
  totalBalance: number;
  depositBalance: number;
  bonusBalance: number;
}
interface Notification {
  
}

let socket = io('wss://9tx.online');

export const connectSocket = (userId: string) => {
  console.log('-=-=-=-userId-=-11=-=-=', userId);
  
    socket.on('connect', () => {
      console.log("✅ Connected to WebSocket");
      socket?.emit("authenticate", { userId });
    })
      socket.on("disconnect", () => {
        console.log("❌ Disconnected from WebSocket");
  
      });
  
  
  // if (!socket) {
  //   console.log('-=-=-=-=-userif-=11-=-=-', userId);
  //   socket = io(SOCKET_URL, {
  //     transports: ["websocket"],
  //     autoConnect: false,
  //   });

  //   socket.on("connect", () => {
  //     console.log("✅ Connected to WebSocket");
  //     socket?.emit("authenticate", { userId });
  //   });

  //   socket.on("disconnect", () => {
  //     console.log("❌ Disconnected from WebSocket");
  //   });

  //   socket.connect();
  // }
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};

export const listenForWalletUpdates = (callback: (wallet: Wallet) => void) => {
  socket?.on("walletUpdated", (walletData: Wallet) => {
    console.log("📢 Wallet Updated:", walletData);
    callback(walletData);
  });
};

export const listenForNotifications = (callback: (notification: Notification) => void) => {
  socket?.on("notification", (notification: Notification) => {
    console.log("🔔 New Notification:", notification);
    callback(notification);
  });
};