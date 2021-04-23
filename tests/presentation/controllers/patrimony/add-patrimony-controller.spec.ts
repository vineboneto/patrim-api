import { AddPatrimonyController } from '@/presentation/controllers'
import { badRequest, forbidden, ok, serverError, unprocessableEntity } from '@/presentation/helper'
import { AlreadyExistsError, InvalidParamError } from '@/presentation/errors'
import { AddPatrimonySpy } from '@/tests/domain/mocks'
import { CheckExistSpy, ValidationSpy } from '@/tests/presentation/mocks'

import faker from 'faker'

const mockRequest = (): AddPatrimonyController.Request => ({
  brand: faker.random.word(),
  number: faker.datatype.number().toString(),
  description: faker.random.words(),
  categoryId: faker.datatype.number(),
  accountId: faker.datatype.number(),
  ownerId: faker.datatype.number()
})

type SutTypes = {
  sut: AddPatrimonyController
  validationSpy: ValidationSpy
  checkExistSpy: CheckExistSpy
  addPatrimonySpy: AddPatrimonySpy
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const checkExistSpy = new CheckExistSpy()
  const addPatrimonySpy = new AddPatrimonySpy()
  const sut = new AddPatrimonyController(validationSpy, checkExistSpy, addPatrimonySpy)
  return {
    sut,
    validationSpy,
    addPatrimonySpy,
    checkExistSpy
  }
}

describe('AddPatrimonyController', () => {
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

  test('Should call CheckExist with correct values', async () => {
    const { sut, checkExistSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(checkExistSpy.input).toEqual(request)
  })

  test('Should return 403 if CheckExists fails', async () => {
    const { sut, checkExistSpy } = makeSut()
    checkExistSpy.result = new InvalidParamError('categoryId')
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(forbidden(new InvalidParamError('categoryId')))
  })

  test('Should call AddPatrimony with correct values', async () => {
    const { sut, addPatrimonySpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(addPatrimonySpy.params).toEqual(request)
  })

  test('Should return 403 if AddPatrimony fails', async () => {
    const { sut, addPatrimonySpy } = makeSut()
    addPatrimonySpy.model = null
    const request = mockRequest()
    const httpResponse = await sut.handle(request)
    expect(httpResponse).toEqual(unprocessableEntity(new AlreadyExistsError(request.number)))
  })

  test('Should return 200 on success', async () => {
    const { sut, addPatrimonySpy } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(ok(addPatrimonySpy.model))
  })

  test('Should return 500 if AddPatrimony throws', async () => {
    const { sut, addPatrimonySpy } = makeSut()
    jest.spyOn(addPatrimonySpy, 'add').mockRejectedValueOnce(new Error())
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 500 if CheckExists  throws', async () => {
    const { sut, checkExistSpy } = makeSut()
    jest.spyOn(checkExistSpy, 'check').mockRejectedValueOnce(new Error())
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
