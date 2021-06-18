import { UpdatePatrimonyController } from '@/presentation/controllers'
import { AlreadyExistsError } from '@/presentation/errors'
import { badRequest, ok, serverError, unprocessableEntity } from '@/presentation/helper'
import { ValidationSpy } from '@/tests/presentation/mocks'
import { UpdatePatrimonySpy } from '@/tests/domain/mocks'

import faker from 'faker'

const mockRequest = (): UpdatePatrimonyController.Request => ({
  id: faker.datatype.number(),
  brand: faker.random.word(),
  number: faker.datatype.number().toString(),
  description: faker.random.words(),
  categoryId: faker.datatype.number(),
  accountId: faker.datatype.number(),
  ownerId: faker.datatype.number()
})

type SutTypes = {
  sut: UpdatePatrimonyController
  validationSpy: ValidationSpy
  updatePatrimonySpy: UpdatePatrimonySpy
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const updatePatrimonySpy = new UpdatePatrimonySpy()
  const sut = new UpdatePatrimonyController(validationSpy, updatePatrimonySpy)
  return {
    sut,
    validationSpy,
    updatePatrimonySpy
  }
}

describe('UpdatePatrimonyController', () => {
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

  test('Should call UpdatePatrimony with correct values', async () => {
    const { sut, updatePatrimonySpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(updatePatrimonySpy.params).toEqual(request)
  })

  test('Should return 403 if UpdatePatrimony fails', async () => {
    const { sut, updatePatrimonySpy } = makeSut()
    updatePatrimonySpy.model = null
    const request = mockRequest()
    const httpResponse = await sut.handle(request)
    expect(httpResponse).toEqual(unprocessableEntity(new AlreadyExistsError(request.number)))
  })

  test('Should return 200 on success', async () => {
    const { sut, updatePatrimonySpy } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(ok(updatePatrimonySpy.model))
  })

  test('Should return 500 if UpdatePatrimony throws', async () => {
    const { sut, updatePatrimonySpy } = makeSut()
    jest.spyOn(updatePatrimonySpy, 'update').mockRejectedValueOnce(new Error())
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
