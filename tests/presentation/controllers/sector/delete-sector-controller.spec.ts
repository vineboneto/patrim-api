import { DeleteSectorController } from '@/presentation/controllers'
import { badRequest, ok, serverError, unprocessableEntity } from '@/presentation/helper'
import { LinkedDataError } from '@/presentation/errors'
import { DeleteSectorSpy } from '@/tests/domain/mocks'
import { ValidationSpy } from '@/tests/presentation/mocks'

import faker from 'faker'

const mockRequest = (): DeleteSectorController.Request => ({
  id: faker.datatype.number()
})

type SutTypes = {
  sut: DeleteSectorController
  deleteSectorSpy: DeleteSectorSpy
  validationSpy: ValidationSpy
}

const makeSut = (): SutTypes => {
  const deleteSectorSpy = new DeleteSectorSpy()
  const validationSpy = new ValidationSpy()
  const sut = new DeleteSectorController(deleteSectorSpy, validationSpy)
  return {
    sut,
    deleteSectorSpy,
    validationSpy
  }
}

describe('DeleteSectorController', () => {
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

  test('Should call DeleteSector with correct value', async () => {
    const { sut, deleteSectorSpy } = makeSut()
    const params = mockRequest()
    await sut.handle(params)
    expect(deleteSectorSpy.params).toEqual(params)
  })

  test('Should return 422 if DeleteSector return null', async () => {
    const { sut, deleteSectorSpy } = makeSut()
    deleteSectorSpy.model = null
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(unprocessableEntity(new LinkedDataError('owners')))
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
