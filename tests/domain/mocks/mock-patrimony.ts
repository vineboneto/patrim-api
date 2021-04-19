import { CheckPatrimonyById, LoadPatrimonyByOwnerId, SavePatrimony } from '@/domain/usecases'

import faker from 'faker'

export const mockPatrimonyModel = (): SavePatrimony.Model => ({
  id: faker.datatype.number(),
  brand: faker.random.word(),
  number: faker.datatype.number().toString(),
  description: faker.random.words(),
  category: {
    id: faker.datatype.number(),
    name: faker.name.findName()
  },
  owner: {
    id: faker.datatype.number(),
    name: faker.name.findName(),
    sector: {
      id: faker.datatype.number(),
      name: faker.name.findName()
    }
  },
  place: {
    id: faker.datatype.number(),
    name: faker.name.findName()
  }
})

export const mockCheckPatrimonyByIdParams = (): CheckPatrimonyById.Params => ({
  id: faker.datatype.number()
})

export class SavePatrimonySpy implements SavePatrimony {
  params: SavePatrimony.Params
  model = mockPatrimonyModel()
  async save (patrimony: SavePatrimony.Params): Promise<SavePatrimony.Model> {
    this.params = patrimony
    return this.model
  }
}

export class LoadPatrimonyByOwnerIdSpy implements LoadPatrimonyByOwnerId {
  params: LoadPatrimonyByOwnerId.Params
  model = {
    id: faker.datatype.number(),
    number: faker.datatype.uuid()
  }

  async loadByOwnerId (params: LoadPatrimonyByOwnerId.Params): Promise<LoadPatrimonyByOwnerId.Model> {
    this.params = params
    return this.model
  }
}
