import { Validation } from '@/presentation/protocols/validation'

export class RequiredField implements Validation {
  validate (input: any): Error {
    return null
  }
}
