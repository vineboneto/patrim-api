export class LinkedDataError extends Error {
  constructor (dataName: string) {
    super(`existing ${dataName} that use this data`)
    this.name = 'LinkedDataError'
  }
}
