import { io } from 'socket.io-client'

import { ClientSocket } from './socket'
import { uri, username, password } from './env'
import { generateToken } from './auth'
import Ping from './ping'

const socket: ClientSocket = io(uri, {
  auth: {
    token: generateToken(username, password),
  },
})

const ping = new Ping(socket)
ping.start()

setInterval(() => {
  // eslint-disable-next-line no-console
  console.debug(`Ping: ${ping.average}ms ±${ping.delta}ms`)
}, 60000)

socket.emit('characterList', (characters) => {
  // eslint-disable-next-line no-console
  console.debug(characters)
})
