import { InvalidParamError } from '@/presentation/errors'
import { Validation } from '@/presentation/protocols'

export class CheckFieldIsNumberValidation implements Validation {
  constructor (
    private readonly fieldName: string
  ) {}

  validate (input: object): Error {
    const validNumber = Number(input[this.fieldName])
    if (isNaN(validNumber)) {
      return new InvalidParamError(this.fieldName)
    }
    return null
  }
}
