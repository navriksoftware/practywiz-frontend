import { io } from "socket.io-client"
import { ApiURL } from "../../Utils/ApiURL"
// Socket configuration

URL = ApiURL()

// Socket configuration
const SOCKET_URL = URL.slice(0, -1)
// const SOCKET_URL = "http://localhost:1337"

export const socket = io(SOCKET_URL, {
  autoConnect: true,
  reconnection: true,
  reconnectionDelay: 1000,
  reconnectionAttempts: 5,
  maxReconnectionAttempts: 5,
  timeout: 20000,
})

// Connection event handlers
socket.on("connect", () => {
  console.log("✅ Connected to server:", socket.id)
})

socket.on("disconnect", (reason) => {
  console.log("❌ Disconnected from server:", reason)
})

socket.on("connect_error", (error) => {
  console.error("🔌 Connection error:", error)
})

socket.on("reconnect", (attemptNumber) => {
  console.log("🔄 Reconnected to server after", attemptNumber, "attempts")
})

socket.on("reconnect_error", (error) => {
  console.error("🔄 Reconnection error:", error)
})

export default socket
