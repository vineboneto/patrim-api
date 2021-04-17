import { DeletePlaceController } from '@/presentation/controllers'
import { LinkedDataError } from '@/presentation/errors'
import { forbidden } from '@/presentation/helper'
import { DeletePlaceSpy } from '@/tests/domain/mocks'

import faker from 'faker'

const mockRequest = (): DeletePlaceController.Request => ({
  id: faker.datatype.number()
})

type SutTypes = {
  sut: DeletePlaceController
  deletePlaceSpy: DeletePlaceSpy
}

const makeSut = (): SutTypes => {
  const deletePlaceSpy = new DeletePlaceSpy()
  const sut = new DeletePlaceController(deletePlaceSpy)
  return {
    sut,
    deletePlaceSpy
  }
}

describe('DeletePlaceController', () => {
  test('Should calls DeletePlace with correct values', async () => {
    const { sut, deletePlaceSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(deletePlaceSpy.params).toEqual(request)
  })

  test('Should return 403 if DeletePlace with returns null', async () => {
    const { sut, deletePlaceSpy } = makeSut()
    deletePlaceSpy.model = null
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(forbidden(new LinkedDataError('patrimonies')))
  })
})
