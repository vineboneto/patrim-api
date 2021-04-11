import {
  AddPlaceRepository,
  CheckPlaceByIdRepository,
  CheckPlaceByNameRepository,
  UpdatePlaceRepository
} from '@/data/protocols'

import faker from 'faker'

export const mockAddPlaceParams = (): AddPlaceRepository.Params => ({
  name: faker.name.findName(),
  userId: faker.datatype.number()
})

export const mockUpdatePlaceParams = (): UpdatePlaceRepository.Params => ({
  id: faker.datatype.number(),
  name: faker.name.findName(),
  userId: faker.datatype.number()
})

export class CheckPlaceByNameRepositorySpy implements CheckPlaceByNameRepository {
  name: string
  result = false

  async checkByName (name: string): Promise<CheckPlaceByNameRepository.Result> {
    this.name = name
    return this.result
  }
}

export class UpdatePlaceRepositorySpy implements UpdatePlaceRepository {
  callsCount = 0
  params: UpdatePlaceRepository.Params
  result = true
  async update (place: UpdatePlaceRepository.Params): Promise<UpdatePlaceRepository.Result> {
    this.callsCount++
    this.params = place
    return this.result
  }
}

export class AddPlaceRepositorySpy implements AddPlaceRepository {
  callsCount = 0
  params: AddPlaceRepository.Params
  result = true
  async add (place: AddPlaceRepository.Params): Promise<AddPlaceRepository.Result> {
    this.callsCount++
    this.params = place
    return this.result
  }
}

export class CheckPlaceByIdRepositorySpy implements CheckPlaceByIdRepository {
  result = true
  id = faker.datatype.number()
  async checkById (id: number): Promise<CheckPlaceByIdRepository.Result> {
    this.id = id
    return this.result
  }
}
