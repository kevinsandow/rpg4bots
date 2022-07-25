import { Server } from 'socket.io'

import {
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData,
} from '../shared/socket'

import { port } from './env'
import { parseToken, validateCredentials } from './aurh'
import logger from './logger'

const server = new Server<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>()

server.use((socket, next) => {
  const credentials = parseToken(socket.handshake.auth?.token || '')

  if (!validateCredentials(credentials)) {
    logger.debug(
      socket,
      `Invalid credentials for user "${credentials.username}" from ${socket.handshake.address}`,
    )
    next(new Error('Invalid credentials'))
    return
  }

  socket.data.username = credentials.username
  next()
})

server.on('connection', (socket) => {
  logger.debug(socket, `New connection from ${socket.handshake.address}`)

  if (socket.data.username) {
    logger.log(socket, `User came online`)
  }

  socket.on('disconnect', () => {
    if (socket.data.username) {
      logger.log(socket, `User went offline`)
    }

    logger.debug(socket, `Connection closed`)
  })

  socket.on('ping', (callback) => {
    callback()
  })
})

server.listen(port)
