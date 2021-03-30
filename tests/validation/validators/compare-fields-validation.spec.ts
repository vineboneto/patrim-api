import { InvalidParamError } from '@/presentation/errors'
import { CompareFieldsValidation } from '@/validation/validators'

describe('CompareFieldValidation', () => {
  test('Should return InvalidParamError if validation fails', () => {
    const sut = new CompareFieldsValidation('field', 'fieldToCompare')
    const isValid = sut.validate({
      field: 'any_value',
      fieldToCompare: 'other_value'
    })
    expect(isValid).toEqual(new InvalidParamError('fieldToCompare'))
  })

  test('Should return null if validation on success', () => {
    const sut = new CompareFieldsValidation('field', 'fieldToCompare')
    const isValid = sut.validate({
      field: 'any_value',
      fieldToCompare: 'any_value'
    })
    expect(isValid).toBeNull()
  })
})
