import { Server } from 'socket.io'

import {
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData,
} from '../shared/socket'

const port = +(process.env?.PORT || '') || 3000

const server = new Server<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>()
server.listen(port)

server.on('connection', (socket) => {
  console.debug(
    `[${socket.id}] New connection from ${socket.handshake.address}`,
  )

  socket.on('disconnect', () => {
    console.debug(`[${socket.id}] Connection closed`)
  })

  socket.on('ping', (callback) => {
    callback()
  })
})
