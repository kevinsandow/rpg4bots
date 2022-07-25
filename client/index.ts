import { io, Socket } from 'socket.io-client'

import { ClientToServerEvents, ServerToClientEvents } from '../shared/socket'

import { uri, username, password } from './env'
import { generateToken } from './auth'

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(uri, {
  auth: {
    token: generateToken(username, password),
  },
})

const pings: number[] = []

function updatePing() {
  const start = Date.now()

  socket.emit('ping', () => {
    pings.push(Date.now() - start)

    while (pings.length > 10) {
      pings.shift()
    }

    const ping = Math.round(pings.reduce((a, b) => a + b) / pings.length)
    const delta = Math.round(pings.map((d) => Math.abs(d - ping)).reduce((a, b) => a + b) / pings.length)

    // eslint-disable-next-line no-console
    console.log(`Ping: ${ping}ms ±${delta}ms (${JSON.stringify(pings)})`)
  })

  setTimeout(updatePing, 10000)
}

setTimeout(updatePing, 1000)

socket.emit('characterList', (characters) => {
  // eslint-disable-next-line no-console
  console.debug(characters)
})
