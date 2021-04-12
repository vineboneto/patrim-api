import { UpdateSectorController } from '@/presentation/controllers'
import { badRequest, forbidden, noContent, serverError } from '@/presentation/helper'
import { AlreadyExistsError, InvalidParamError, MissingParamError } from '@/presentation/errors'
import { ValidationSpy } from '@/tests/presentation/mocks'
import { CheckSectorByIdSpy, SaveSectorSpy } from '@/tests/domain/mocks'

import faker from 'faker'

const mockRequest = (): UpdateSectorController.Request => ({
  id: faker.datatype.number().toString(),
  name: faker.name.findName()
})

type SutTypes = {
  sut: UpdateSectorController
  validationSpy: ValidationSpy
  saveSectorSpy: SaveSectorSpy
  checkSectorByIdSpy: CheckSectorByIdSpy
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const checkSectorByIdSpy = new CheckSectorByIdSpy()
  const saveSectorSpy = new SaveSectorSpy()
  const sut = new UpdateSectorController(validationSpy, saveSectorSpy, checkSectorByIdSpy)
  return {
    sut,
    validationSpy,
    saveSectorSpy,
    checkSectorByIdSpy
  }
}

describe('SaveSectorController', () => {
  test('Should call Validation with correct value', async () => {
    const { sut, validationSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(validationSpy.input).toEqual(request)
  })

  test('Should return 400 Validation if validation fails', async () => {
    const { sut, validationSpy } = makeSut()
    validationSpy.result = new MissingParamError('id')
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(badRequest(validationSpy.result))
  })

  test('Should call SaveSector with correct value', async () => {
    const { sut, saveSectorSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(saveSectorSpy.params).toEqual(request)
  })

  test('Should call SaveSector with correct value', async () => {
    const { sut, saveSectorSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(saveSectorSpy.params).toEqual(request)
  })

  test('Should return 403 if SaveSector fails', async () => {
    const { sut, saveSectorSpy } = makeSut()
    saveSectorSpy.result = false
    const request = mockRequest()
    const httpResponse = await sut.handle(request)
    expect(httpResponse).toEqual(forbidden(new AlreadyExistsError(request.name)))
  })

  test('Should call CheckSectorById with correct value', async () => {
    const { sut, checkSectorByIdSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(checkSectorByIdSpy.id).toEqual(request.id)
  })

  test('Should return 403 if CheckSectorById if return false', async () => {
    const { sut, checkSectorByIdSpy } = makeSut()
    checkSectorByIdSpy.result = false
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(forbidden(new InvalidParamError('id')))
  })

  test('Should return 500 if CheckSectorById throws', async () => {
    const { sut, checkSectorByIdSpy } = makeSut()
    const error = new Error()
    jest.spyOn(checkSectorByIdSpy, 'checkById').mockRejectedValueOnce(error)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(error))
  })

  test('Should return 500 if SaveSector throws', async () => {
    const { sut, saveSectorSpy } = makeSut()
    const error = new Error()
    jest.spyOn(saveSectorSpy, 'save').mockRejectedValueOnce(error)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(error))
  })

  test('Should return 204 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(noContent())
  })
})
