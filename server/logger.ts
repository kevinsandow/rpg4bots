import { Socket } from 'socket.io'

import {
  ClientToServerEvents,
  InterServerEvents,
  ServerToClientEvents,
  SocketData,
} from '../shared/socket'

function combineWithSocketData(
  socket: Socket<
    ClientToServerEvents,
    ServerToClientEvents,
    InterServerEvents,
    SocketData
  >,
  ...data: any[]
): // eslint-disable-next-line @typescript-eslint/no-explicit-any
any[] {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const output: any[] = Array.from(data)

  if (socket.data.username) {
    output.unshift(`[${socket.data.username}]`)
  }

  output.unshift(`[${socket.id}]`)
  // output.unshift(`[${socket.handshake.address}]`)

  return output
}

export default {
  log: (
    socket: Socket<
      ClientToServerEvents,
      ServerToClientEvents,
      InterServerEvents,
      SocketData
    >,
    ...data: any[]
  ): void => {
    // eslint-disable-next-line no-console
    console.log(...combineWithSocketData(socket, ...data))
  },
  debug: (
    socket: Socket<
      ClientToServerEvents,
      ServerToClientEvents,
      InterServerEvents,
      SocketData
    >,
    ...data: any[]
  ): void => {
    // eslint-disable-next-line no-console
    console.debug(...combineWithSocketData(socket, ...data))
  },
  error: (
    socket: Socket<
      ClientToServerEvents,
      ServerToClientEvents,
      InterServerEvents,
      SocketData
    >,
    ...data: any[]
  ): void => {
    // eslint-disable-next-line no-console
    console.error(...combineWithSocketData(socket, ...data))
  },
}
