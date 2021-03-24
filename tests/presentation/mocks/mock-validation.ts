import { Validation } from '@/presentation/protocols/validation'

export class ValidationSpy implements Validation {
  input: any
  result = null

  validate (input: any): Error {
    this.input = input
    return this.result
  }
}
