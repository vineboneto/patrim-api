import { EmailValidator } from '@/validation/protocols'
import { Validation } from '@/presentation/protocols'
import { InvalidParamError } from '@/presentation/errors'

export class EmailValidation implements Validation {
  constructor (
    private readonly emailValidator: EmailValidator,
    private readonly fieldName: string
  ) {}

  validate (input: object): Error {
    const isValid = this.emailValidator.isValid(input[this.fieldName])
    if (!isValid) {
      return new InvalidParamError(this.fieldName)
    }
    return null
  }
}
