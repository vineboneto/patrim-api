import { ValidationSpy } from '@/tests/presentation/mocks'
import { LoadOwnersController } from '@/presentation/controllers'

import faker from 'faker'

const mockRequest = (): LoadOwnersController.Request => ({
  take: faker.datatype.number().toString(),
  skip: faker.datatype.number().toString()
})

type SutTypes = {
  sut: LoadOwnersController
  validationSpy: ValidationSpy
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const sut = new LoadOwnersController(validationSpy)
  return {
    sut,
    validationSpy
  }
}

describe('LoadOwnersController', () => {
  test('Should call Validation with correct values', async () => {
    const { sut, validationSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(validationSpy.input).toEqual(request)
  })
})
