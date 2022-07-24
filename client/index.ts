import { io, Socket } from 'socket.io-client'

import { ClientToServerEvents, ServerToClientEvents } from '../shared/socket'

const uri = process.env?.SERVER_URI || 'http://localhost:3000'

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(uri)

const start = Date.now()

socket.emit('ping', () => {
  console.log(`Ping: ${Date.now() - start}ms`)

  socket.close()
})
