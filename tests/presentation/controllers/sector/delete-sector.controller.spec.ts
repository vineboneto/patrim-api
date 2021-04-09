import { DeleteSectorController } from '@/presentation/controllers'
import { MissingParamError } from '@/presentation/errors'
import { badRequest } from '@/presentation/helper'
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
    expect(deleteSectorSpy.params).toEqual({ id: Number(id) })
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
})
