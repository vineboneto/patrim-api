import { LoadPatrimonyByIdController } from '@/presentation/controllers'
import { badRequest } from '@/presentation/helper'
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

  test('Should return 400 if Validation fails', async () => {
    const { sut, validationSpy } = makeSut()
    validationSpy.result = new Error()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(badRequest(new Error()))
  })
})
