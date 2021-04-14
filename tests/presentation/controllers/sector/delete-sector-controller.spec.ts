import { DeleteSectorController } from '@/presentation/controllers'
import { InvalidParamError, MissingParamError } from '@/presentation/errors'
import { badRequest, ok, serverError } from '@/presentation/helper'
import { ValidationSpy } from '@/tests/presentation/mocks'
import { DeleteSectorSpy } from '@/tests/domain/mocks'

import faker from 'faker'

const mockRequest = (): DeleteSectorController.Request => ({
  id: faker.datatype.number().toString()
})

type SutTypes = {
  sut: DeleteSectorController
  deleteSectorSpy: DeleteSectorSpy
  validationSpy: ValidationSpy
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const deleteSectorSpy = new DeleteSectorSpy()
  const sut = new DeleteSectorController(deleteSectorSpy, validationSpy)
  return {
    sut,
    deleteSectorSpy,
    validationSpy
  }
}

describe('DeleteSectorController', () => {
  test('Should call DeleteSector with correct value', async () => {
    const { sut, deleteSectorSpy } = makeSut()
    const { id } = mockRequest()
    await sut.handle({ id })
    expect(deleteSectorSpy.params).toEqual({ id })
  })

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

  test('Should return 404 if DeleteSector return null', async () => {
    const { sut, deleteSectorSpy } = makeSut()
    deleteSectorSpy.model = null
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(badRequest(new InvalidParamError('id')))
  })

  test('Should return 200 with sectorDeleted if DeleteSector succeeds', async () => {
    const { sut, deleteSectorSpy } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(ok(deleteSectorSpy.model))
  })

  test('Should return 500 if DeleteSector throws', async () => {
    const { sut, deleteSectorSpy } = makeSut()
    const error = new Error()
    jest.spyOn(deleteSectorSpy, 'delete').mockRejectedValueOnce(error)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(error))
  })
})
