import { SaveOwnerController } from '@/presentation/controllers'
import { InvalidParamError, MissingParamError } from '@/presentation/errors'
import { badRequest, forbidden, ok, serverError } from '@/presentation/helper'
import { ValidationSpy } from '@/tests/presentation/mocks'
import { SaveOwnerSpy } from '@/tests/domain/mocks'

import faker from 'faker'

const mockRequest = (): SaveOwnerController.Request => ({
  id: faker.datatype.number(),
  name: faker.name.findName(),
  sectorId: faker.datatype.number()
})

type SutTypes = {
  sut: SaveOwnerController
  validationSpy: ValidationSpy
  saveOwnerSpy: SaveOwnerSpy
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const saveOwnerSpy = new SaveOwnerSpy()
  const sut = new SaveOwnerController(validationSpy, saveOwnerSpy)
  return {
    sut,
    validationSpy,
    saveOwnerSpy
  }
}

describe('SaveOwnerController', () => {
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

  test('Should call SaveOwner with correct value', async () => {
    const { sut, saveOwnerSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(saveOwnerSpy.params).toEqual(request)
  })

  test('Should return 403 if SaveOwner returns null', async () => {
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

  test('Should return 500 if SaveCategory throws', async () => {
    const { sut, saveOwnerSpy } = makeSut()
    jest.spyOn(saveOwnerSpy, 'save').mockRejectedValueOnce(new Error())
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
