import { AddSectorController } from '@/presentation/controllers'
import { AddSector } from '@/domain/usecases'

describe('AddSectorController', () => {
  test('Should call AddSector with correct values', async () => {
    class AddSectorSpy implements AddSector {
      params: AddSector.Params
      result = true
      async add (sector: AddSector.Params): Promise<AddSector.Result> {
        this.params = sector
        return this.result
      }
    }
    const addSectorSpy = new AddSectorSpy()
    const sut = new AddSectorController(addSectorSpy)
    const request = {
      name: 'any_sector_name'
    }
    await sut.handle(request)
    expect(addSectorSpy.params).toEqual(request)
  })
})
