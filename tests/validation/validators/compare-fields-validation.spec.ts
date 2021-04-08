import { CompareFieldsValidation } from '@/validation/validators'
import { InvalidParamError } from '@/presentation/errors'

const makeSut = (): CompareFieldsValidation => new CompareFieldsValidation('field', 'fieldToCompare')

describe('CompareFieldValidation', () => {
  test('Should return InvalidParamError if validation fails', () => {
    const sut = makeSut()
    const isValid = sut.validate({
      field: 'any_value',
      fieldToCompare: 'other_value'
    })
    expect(isValid).toEqual(new InvalidParamError('fieldToCompare'))
  })

  test('Should return null if validation on success', () => {
    const sut = makeSut()
    const isValid = sut.validate({
      field: 'any_value',
      fieldToCompare: 'any_value'
    })
    expect(isValid).toBeNull()
  })
})
