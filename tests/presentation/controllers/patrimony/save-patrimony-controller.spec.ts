import { SavePatrimonyController } from '@/presentation/controllers'
import { badRequest, forbidden, ok, serverError, unprocessableEntity } from '@/presentation/helper'
import { AlreadyExistsError, InvalidParamError } from '@/presentation/errors'
import { SavePatrimonySpy } from '@/tests/domain/mocks'
import { CheckExistSpy, ValidationSpy } from '@/tests/presentation/mocks'

import faker from 'faker'

const mockRequest = (): SavePatrimonyController.Request => ({
  id: faker.datatype.number(),
  brand: faker.random.word(),
  number: faker.datatype.number().toString(),
  description: faker.random.words(),
  categoryId: faker.datatype.number(),
  placeId: faker.datatype.number(),
  ownerId: faker.datatype.number()
})

type SutTypes = {
  sut: SavePatrimonyController
  validationSpy: ValidationSpy
  checkExistSpy: CheckExistSpy
  savePatrimonySpy: SavePatrimonySpy
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const checkExistSpy = new CheckExistSpy()
  const savePatrimonySpy = new SavePatrimonySpy()
  const sut = new SavePatrimonyController(validationSpy, checkExistSpy, savePatrimonySpy)
  return {
    sut,
    validationSpy,
    savePatrimonySpy,
    checkExistSpy
  }
}

describe('SavePatrimonyController', () => {
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

  test('Should call SavePatrimony with correct values', async () => {
    const { sut, savePatrimonySpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(savePatrimonySpy.params).toEqual(request)
  })

  test('Should return 403 if SavePatrimony fails', async () => {
    const { sut, savePatrimonySpy } = makeSut()
    savePatrimonySpy.model = null
    const request = mockRequest()
    const httpResponse = await sut.handle(request)
    expect(httpResponse).toEqual(unprocessableEntity(new AlreadyExistsError(request.number)))
  })

  test('Should return 200 on success', async () => {
    const { sut, savePatrimonySpy } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(ok(savePatrimonySpy.model))
  })

  test('Should return 500 if SavePatrimony throws', async () => {
    const { sut, savePatrimonySpy } = makeSut()
    jest.spyOn(savePatrimonySpy, 'save').mockRejectedValueOnce(new Error())
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
