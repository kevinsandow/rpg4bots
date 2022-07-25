export type CharacterShort = {
  name: string
}

export type CharacterList = CharacterShort[]

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ServerToClientEvents {}

export interface ClientToServerEvents {
  ping: (callback: () => void) => void
  characterList: (cb: (characters: CharacterList) => void) => void
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface InterServerEvents {}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface SocketData {
  username: string
}
