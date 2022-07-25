import { CharacterList } from '../../shared/socket'

import users, { User } from './users'

// eslint-disable-next-line import/prefer-default-export
export async function getCharacterList(
  username: string,
): Promise<CharacterList> {
  const user = users.find((u: User) => u.username === username)
  let { characters } = user || {}

  const demoUser = users.find((u: User) => u.username === 'demo') as User
  if (!user) {
    characters = demoUser.characters
  }

  return (characters || []).map((c) => ({
    name: c.name,
  }))
}
