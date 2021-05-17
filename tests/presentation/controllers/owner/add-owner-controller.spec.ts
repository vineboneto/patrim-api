import { AddOwnerController } from '@/presentation/controllers'
import { InvalidParamError, MissingParamError } from '@/presentation/errors'
import { badRequest, forbidden, ok, serverError } from '@/presentation/helper'
import { CheckExistSpy, ValidationSpy } from '@/tests/presentation/mocks'
import { AddOwnerSpy } from '@/tests/domain/mocks'

import faker from 'faker'

const mockRequest = (): AddOwnerController.Request => ({
  name: faker.name.findName(),
  sectorId: faker.datatype.number(),
  accountId: faker.datatype.number()
})

type SutTypes = {
  sut: AddOwnerController
  validationSpy: ValidationSpy
  checkExistSpy: CheckExistSpy
  addOwnerSpy: AddOwnerSpy
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const addOwnerSpy = new AddOwnerSpy()
  const checkExistSpy = new CheckExistSpy()
  const sut = new AddOwnerController(validationSpy, checkExistSpy, addOwnerSpy)
  return {
    sut,
    validationSpy,
    addOwnerSpy,
    checkExistSpy
  }
}

describe('AddOwnerController', () => {
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

  test('Should call AddOwner with correct value', async () => {
    const { sut, addOwnerSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(addOwnerSpy.params).toEqual(request)
  })

  test('Should return 403 if AddOwner returns null', async () => {
    const { sut, addOwnerSpy } = makeSut()
    addOwnerSpy.model = null
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(forbidden(new InvalidParamError('sectorId')))
  })

  test('Should return 200 on success', async () => {
    const { sut, addOwnerSpy } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(ok(addOwnerSpy.model))
  })

  test('Should return 500 if AddOwner throws', async () => {
    const { sut, addOwnerSpy } = makeSut()
    jest.spyOn(addOwnerSpy, 'add').mockRejectedValueOnce(new Error())
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
