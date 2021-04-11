import { DbSavePlace } from '@/data/usecases'
import { CheckPlaceByNameRepositorySpy } from '@/tests/data/mocks'

describe('DbSavePlace', () => {
  test('Should call CheckPlaceByNameRepository with correct value', async () => {
    const checkPlaceByNameRepositorySpy = new CheckPlaceByNameRepositorySpy()
    const sut = new DbSavePlace(checkPlaceByNameRepositorySpy)
    const data = {
      id: 0,
      name: 'any_name',
      userId: 0
    }
    await sut.save(data)
    expect(checkPlaceByNameRepositorySpy.name).toBe(data.name)
  })
})
