import { Socket } from 'socket.io-client'

import { ClientToServerEvents, ServerToClientEvents } from '../shared/socket'

export type ClientSocket = Socket<ServerToClientEvents, ClientToServerEvents>
