import { UpdateOwnerController } from '@/presentation/controllers'
import { InvalidParamError, MissingParamError } from '@/presentation/errors'
import { badRequest, forbidden, ok, serverError } from '@/presentation/helper'
import { CheckExistSpy, ValidationSpy } from '@/tests/presentation/mocks'
import { UpdateOwnerSpy } from '@/tests/domain/mocks'

import faker from 'faker'

const mockRequest = (): UpdateOwnerController.Request => ({
  id: faker.datatype.number(),
  name: faker.name.findName(),
  sectorId: faker.datatype.number()
})

type SutTypes = {
  sut: UpdateOwnerController
  validationSpy: ValidationSpy
  saveOwnerSpy: UpdateOwnerSpy
  checkExistSpy: CheckExistSpy
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const saveOwnerSpy = new UpdateOwnerSpy()
  const checkExistSpy = new CheckExistSpy()
  const sut = new UpdateOwnerController(validationSpy, checkExistSpy, saveOwnerSpy)
  return {
    sut,
    validationSpy,
    checkExistSpy,
    saveOwnerSpy
  }
}

describe('UpdateOwnerController', () => {
  test('Should call Validation with correct value', async () => {
    const { sut, validationSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(validationSpy.input).toEqual(request)
  })

  test('Should return 400 if Validation fails', async () => {
    const { sut, validationSpy } = makeSut()
    validationSpy.result = new MissingParamError('name')
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(badRequest(new MissingParamError('name')))
  })

  test('Should call CheckExist with correct values', async () => {
    const { sut, checkExistSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(checkExistSpy.input).toEqual(request)
  })

  test('Should return 403 if CheckExists fails', async () => {
    const { sut, checkExistSpy } = makeSut()
    checkExistSpy.result = new InvalidParamError('id')
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(forbidden(new InvalidParamError('id')))
  })

  test('Should call UpdateOwner with correct value', async () => {
    const { sut, saveOwnerSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(saveOwnerSpy.params).toEqual(request)
  })

  test('Should return 403 if UpdateOwner returns null', async () => {
    const { sut, saveOwnerSpy } = makeSut()
    saveOwnerSpy.model = null
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(forbidden(new InvalidParamError('sectorId')))
  })

  test('Should return 200 on success', async () => {
    const { sut, saveOwnerSpy } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(ok(saveOwnerSpy.model))
  })

  test('Should return 500 if UpdateOwner throws', async () => {
    const { sut, saveOwnerSpy } = makeSut()
    jest.spyOn(saveOwnerSpy, 'update').mockRejectedValueOnce(new Error())
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
