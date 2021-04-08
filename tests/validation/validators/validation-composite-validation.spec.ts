import { ValidationComposite } from '@/validation/validators'
import { MissingParamError } from '@/presentation/errors'
import { ValidationSpy } from '@/tests/presentation/mocks'

import faker from 'faker'

type SutTypes = {
  sut: ValidationComposite
  validationSpies: ValidationSpy[]
}

const makeSut = (): SutTypes => {
  const validationSpies = [new ValidationSpy(), new ValidationSpy()]
  const sut = new ValidationComposite(validationSpies)
  return {
    sut,
    validationSpies
  }
}

describe('ValidationComposite', () => {
  test('Should return an error if any validation fails', () => {
    const { sut, validationSpies } = makeSut()
    validationSpies[0].result = new MissingParamError('field')
    const error = sut.validate({ field: faker.random.word() })
    expect(error).toEqual(validationSpies[0].result)
  })

  test('Should return the first error if more then one validation fails', () => {
    const { sut, validationSpies } = makeSut()
    validationSpies[0].result = new MissingParamError('field')
    validationSpies[1].result = new MissingParamError('otherField')
    const error = sut.validate({ field: faker.random.word() })
    expect(error).toEqual(validationSpies[0].result)
  })

  test('Should return null if validation succeeds', () => {
    const { sut } = makeSut()
    const error = sut.validate({ field: faker.random.word() })
    expect(error).toBeFalsy()
  })
})
