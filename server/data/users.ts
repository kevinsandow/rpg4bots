export type Character = {
  name: string
}

export type User = {
  username: string
  characters: Character[]
}

export default [
  {
    username: 'demo',
    characters: [
      {
        name: 'jim',
      },
      {
        name: 'jack',
      },
      {
        name: 'johnny',
      },
    ],
  },
] as User[]
