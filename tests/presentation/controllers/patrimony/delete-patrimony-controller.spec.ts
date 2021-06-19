import { DeletePatrimonyController } from '@/presentation/controllers'
import { ok, serverError } from '@/presentation/helper'
import { DeletePatrimonySpy } from '@/tests/domain/mocks'

import faker from 'faker'

const mockRequest = (): DeletePatrimonyController.Request => ({
  id: faker.datatype.number()
})

type SutTypes = {
  sut: DeletePatrimonyController
  deletePatrimonySpy: DeletePatrimonySpy
}

const makeSut = (): SutTypes => {
  const deletePatrimonySpy = new DeletePatrimonySpy()
  const sut = new DeletePatrimonyController(deletePatrimonySpy)
  return {
    sut,
    deletePatrimonySpy
  }
}

describe('DeletePatrimonyController', () => {
  test('Should call DeletePatrimony with correct value', async () => {
    const { sut, deletePatrimonySpy } = makeSut()
    const params = mockRequest()
    await sut.handle(params)
    expect(deletePatrimonySpy.params).toEqual(params)
  })

  test('Should return 200 with ownerDeleted if DeletePatrimony succeeds', async () => {
    const { sut, deletePatrimonySpy } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(ok(deletePatrimonySpy.model))
  })

  test('Should return 500 if DeletePatrimony throws', async () => {
    const { sut, deletePatrimonySpy } = makeSut()
    const error = new Error()
    jest.spyOn(deletePatrimonySpy, 'delete').mockRejectedValueOnce(error)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(error))
  })
})
