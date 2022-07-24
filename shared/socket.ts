export interface ServerToClientEvents {}

export interface ClientToServerEvents {
  ping: (callback: () => void) => void
}

export interface InterServerEvents {}

export interface SocketData {}
