import { DeletePatrimonyController } from '@/presentation/controllers'
import { badRequest, ok, serverError } from '@/presentation/helper'
import { DeletePatrimonySpy } from '@/tests/domain/mocks'
import { ValidationSpy } from '@/tests/presentation/mocks'

import faker from 'faker'

const mockRequest = (): DeletePatrimonyController.Request => ({
  id: faker.datatype.number()
})

type SutTypes = {
  sut: DeletePatrimonyController
  deletePatrimonySpy: DeletePatrimonySpy
  validationSpy: ValidationSpy
}

const makeSut = (): SutTypes => {
  const deletePatrimonySpy = new DeletePatrimonySpy()
  const validationSpy = new ValidationSpy()
  const sut = new DeletePatrimonyController(deletePatrimonySpy, validationSpy)
  return {
    sut,
    deletePatrimonySpy,
    validationSpy
  }
}

describe('DeletePatrimonyController', () => {
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

  test('Should call DeletePatrimony with correct value', async () => {
    const { sut, deletePatrimonySpy } = makeSut()
    const params = mockRequest()
    await sut.handle(params)
    expect(deletePatrimonySpy.params).toEqual(params)
  })

  test('Should return 200 with ownerDeleted if DeletePatrimony succeeds', async () => {
    const { sut, deletePatrimonySpy } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(ok(deletePatrimonySpy.model))
  })

  test('Should return 500 if DeletePatrimony throws', async () => {
    const { sut, deletePatrimonySpy } = makeSut()
    const error = new Error()
    jest.spyOn(deletePatrimonySpy, 'delete').mockRejectedValueOnce(error)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(error))
  })
})
