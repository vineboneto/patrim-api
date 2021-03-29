import { EmailValidator } from '@/validation/protocols'
import { Validation } from '@/presentation/protocols'

export class EmailValidation implements Validation {
  constructor (
    private readonly emailValidator: EmailValidator,
    private readonly fieldName: string
  ) {}

  validate (input: any): Error {
    this.emailValidator.isValid(input[this.fieldName])
    return null
  }
}
