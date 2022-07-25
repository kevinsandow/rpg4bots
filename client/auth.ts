// eslint-disable-next-line import/prefer-default-export
export function generateToken(username: string, password: string): string {
  return Buffer.from(`${username}:${password}`).toString('base64')
}
