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

new Ping(socket).start()

socket.emit('characterList', (characters) => {
  // eslint-disable-next-line no-console
  console.debug(characters)
})
