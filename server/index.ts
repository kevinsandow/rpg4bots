import { Server } from 'socket.io'

import {
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData,
} from '../shared/socket'

import { port } from './env'
import { parseToken, validateCredentials } from './aurh'

const server = new Server<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>()

server.use((socket, next) => {
  const credentials = parseToken(socket.handshake.auth?.token || '')

  if (!validateCredentials(credentials)) {
    console.debug(
      `[${socket.id}] Invalid credentials for user "${credentials.username}" from ${socket.handshake.address}`,
    )
    next(new Error('Invalid credentials'))
    return
  }

  socket.data.username = credentials.username
  next()
})

server.on('connection', (socket) => {
  console.debug(
    `[${socket.id}] New connection from ${socket.handshake.address}`,
  )

  if (socket.data.username) {
    console.log(`[${socket.id}] User "${socket.data.username}" came online`)
  }

  socket.on('disconnect', () => {
    if (socket.data.username) {
      console.log(`[${socket.id}] User "${socket.data.username}" went offline`)
    }

    console.debug(`[${socket.id}] Connection closed`)
  })

  socket.on('ping', (callback) => {
    callback()
  })
})

server.listen(port)
