export const encodeBase64 = (string: string) => {
  return Buffer.from(string).toString('base64')
}
