import { CheckFieldIsNumberValidation } from '@/validation/validators'
import { InvalidParamError } from '@/presentation/errors'

const makeSut = (): CheckFieldIsNumberValidation => new CheckFieldIsNumberValidation('field')

describe('CheckFieldIsNumberValidation', () => {
  test('Should return InvalidParamError on fails to convert string to number', () => {
    const sut = makeSut()
    const isValid = sut.validate({ field: 'any_string' })
    expect(isValid).toEqual(new InvalidParamError('field'))
  })
})
