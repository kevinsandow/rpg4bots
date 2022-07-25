import { io, Socket } from 'socket.io-client'

import { ClientToServerEvents, ServerToClientEvents } from '../shared/socket'

import { uri, username, password } from './env'
import { generateToken } from './auth'

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(uri, {
  auth: {
    token: generateToken(username, password),
  },
})

const start = Date.now()

socket.emit('ping', () => {
  // eslint-disable-next-line no-console
  console.log(`Ping: ${Date.now() - start}ms`)
})

socket.emit('characterList', (characters) => {
  // eslint-disable-next-line no-console
  console.debug(characters)
})
