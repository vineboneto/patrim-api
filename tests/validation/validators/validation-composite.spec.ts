import { MissingParamError } from '@/presentation/errors'
import { Validation } from '@/presentation/protocols/validation'
import { ValidationComposite } from '@/validation/validators'

class ValidationSpy implements Validation {
  input: any
  result = null

  validate (input: any): Error {
    this.input = input
    return this.result
  }
}

describe('ValidationComposite', () => {
  test('Should return an error if any validation fails', () => {
    const validationSpies = [new ValidationSpy(), new ValidationSpy()]
    const sut = new ValidationComposite(validationSpies)
    validationSpies[0].result = new MissingParamError('any_field')
    const error = sut.validate({ field: 'any_value' })
    expect(error).toEqual(validationSpies[0].result)
  })
})
