import { UpdatePlaceController } from '@/presentation/controllers'
import { AlreadyExistsError, InvalidParamError, MissingParamError } from '@/presentation/errors'
import { badRequest, forbidden, noContent, serverError } from '@/presentation/helper'
import { ValidationSpy } from '@/tests/presentation/mocks'
import { CheckAccountByIdSpy, CheckPlaceByIdSpy, SavePlaceSpy } from '@/tests/domain/mocks'

import faker from 'faker'

const mockRequest = (): UpdatePlaceController.Request => ({
  id: faker.datatype.number().toString(),
  name: faker.name.jobArea(),
  userId: faker.datatype.number().toString()
})

type SutTypes = {
  sut: UpdatePlaceController
  savePlaceSpy: SavePlaceSpy
  validationSpy: ValidationSpy
  checkAccountByIdSpy: CheckAccountByIdSpy
  checkPlaceByIdSpy: CheckPlaceByIdSpy
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const savePlaceSpy = new SavePlaceSpy()
  const checkAccountByIdSpy = new CheckAccountByIdSpy()
  const checkPlaceByIdSpy = new CheckPlaceByIdSpy()
  const sut = new UpdatePlaceController(savePlaceSpy, checkAccountByIdSpy, checkPlaceByIdSpy, validationSpy)
  return {
    sut,
    savePlaceSpy,
    checkAccountByIdSpy,
    checkPlaceByIdSpy,
    validationSpy
  }
}

describe('UpdatePlaceController', () => {
  test('Should call Validation with only name if userId is undefined', async () => {
    const { sut, validationSpy } = makeSut()
    const { id, name } = mockRequest()
    await sut.handle({ id, name })
    expect(validationSpy.input).toEqual({ id, name })
  })

  test('Should call Validation with name and userId if userId not is undefined', async () => {
    const { sut, validationSpy } = makeSut()
    const { id, name, userId } = mockRequest()
    await sut.handle({ id, name, userId })
    expect(validationSpy.input).toEqual({ id, name, userId })
  })

  test('Should return 400 Validation fails', async () => {
    const { sut, validationSpy } = makeSut()
    validationSpy.result = new MissingParamError('name')
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(badRequest(new MissingParamError('name')))
  })

  test('Should call CheckAccountByIdSpy with correct value', async () => {
    const { sut, checkAccountByIdSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(checkAccountByIdSpy.id).toEqual(request.userId)
  })

  test('Should return 403 CheckAccountByIdSpy returns false', async () => {
    const { sut, checkAccountByIdSpy } = makeSut()
    checkAccountByIdSpy.result = false
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(forbidden(new InvalidParamError('userId')))
  })

  test('Should call CheckPlaceByIdSpy with correct value', async () => {
    const { sut, checkPlaceByIdSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(checkPlaceByIdSpy.id).toBe(request.id)
  })

  test('Should call SavePlace with correct value', async () => {
    const { sut, savePlaceSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(savePlaceSpy.params).toEqual(request)
  })

  test('Should return 403 if SavePlace returns false', async () => {
    const { sut, savePlaceSpy } = makeSut()
    savePlaceSpy.result = false
    const request = mockRequest()
    const httpResponse = await sut.handle(request)
    expect(httpResponse).toEqual(forbidden(new AlreadyExistsError(request.name)))
  })

  test('Should return 204 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(noContent())
  })

  test('Should return 500 if CheckAccountByIdSpy throws', async () => {
    const { sut, checkAccountByIdSpy } = makeSut()
    const error = new Error()
    jest.spyOn(checkAccountByIdSpy, 'checkById').mockRejectedValueOnce(error)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(error))
  })

  test('Should return 500 if SavePlace throws', async () => {
    const { sut, savePlaceSpy } = makeSut()
    const error = new Error()
    jest.spyOn(savePlaceSpy, 'save').mockRejectedValueOnce(error)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(error))
  })
})
