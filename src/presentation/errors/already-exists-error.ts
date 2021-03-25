export class AlreadyExistsError extends Error {
  constructor (paramName: string) {
    super(`Already Exists: ${paramName}`)
    this.name = 'AlreadyExistsError'
  }
}
