type Credentials = {
  username: string
  password: string
}

export function parseToken(token: string): Credentials {
  const [username, password] = Buffer.from(token, 'base64')
    .toString()
    .split(':')

  return {
    username: username ?? '',
    password: password ?? '',
  }
}

export function validateCredentials({
  username,
  password,
}: Credentials): boolean {
  // TODO: do real validation in the future
  return username === password
}
