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
import { getCharacterList } from './data/characters'

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

  socket.on('disconnect', () => {
    logger.debug(socket, `Connection closed`)
  })

  socket.on('ping', (callback) => {
    callback()
  })

  socket.on('characterList', (cb) => {
    getCharacterList(socket.data.username || '')
      .then((data) => cb(data))
      .catch((e) => {
        logger.error(socket, `Retrieving character list failed: ${e.message}`)
        cb([])
      })
  })
})

server.listen(port)
