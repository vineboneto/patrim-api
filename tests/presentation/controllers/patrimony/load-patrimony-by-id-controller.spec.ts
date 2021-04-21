import { LoadPatrimonyByIdController } from '@/presentation/controllers'
import { ValidationSpy } from '@/tests/presentation/mocks'

import faker from 'faker'

const mockRequest = (): LoadPatrimonyByIdController.Request => ({
  id: faker.datatype.number()
})

type SutTypes = {
  sut: LoadPatrimonyByIdController
  validationSpy: ValidationSpy
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const sut = new LoadPatrimonyByIdController(validationSpy)
  return {
    sut,
    validationSpy
  }
}

describe('LoadPatrimonyByIdController', () => {
  test('Should call Validation with correct values', async () => {
    const { sut, validationSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(validationSpy.input).toEqual(request)
  })
})
