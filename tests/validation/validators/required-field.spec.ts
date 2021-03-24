import { MissingParamError } from '@/presentation/errors'
import { RequiredField } from '@/validation/validators'

import faker from 'faker'

describe('RequiredField', () => {
  test('Should not return if field exists', () => {
    const sut = new RequiredField('field')
    const error = sut.validate({ field: faker.random.word() })
    expect(error).toBeFalsy()
  })

  test('Should return MissingParamError if field does not exits', () => {
    const sut = new RequiredField('field')
    const error = sut.validate({ otherField: 'any_value' })
    expect(error).toEqual(new MissingParamError('field'))
  })
})
