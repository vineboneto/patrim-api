import { RequiredFieldValidation } from '@/validation/validators'
import { MissingParamError } from '@/presentation/errors'

import faker from 'faker'

const makeSut = (fieldName: string): RequiredFieldValidation => new RequiredFieldValidation(fieldName)

describe('RequiredFieldValidation', () => {
  test('Should not return if field exists', () => {
    const field = faker.database.column()
    const sut = makeSut(field)
    const error = sut.validate({ [field]: faker.random.word() })
    expect(error).toBeFalsy()
  })

  test('Should return MissingParamError if field does not exits', () => {
    const field = faker.database.column()
    const sut = makeSut(field)
    const error = sut.validate({ otherField: faker.random.word() })
    expect(error).toEqual(new MissingParamError(field))
  })
})
