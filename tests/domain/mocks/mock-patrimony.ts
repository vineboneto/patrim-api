import { CheckPatrimonyById, LoadPatrimonyByOwnerId, SavePatrimony, UpdatePatrimony } from '@/domain/usecases'

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

export const mockUpdatePatrimonyParams = (): UpdatePatrimony.Params => ({
  id: faker.datatype.number(),
  number: '123',
  brand: faker.random.word(),
  description: faker.random.words(),
  categoryId: faker.datatype.number(),
  ownerId: faker.datatype.number(),
  placeId: faker.datatype.number()

})

export const mockCheckPatrimonyByIdParams = (): CheckPatrimonyById.Params => ({
  id: faker.datatype.number()
})

export class UpdatePatrimonySpy implements UpdatePatrimony {
  params: UpdatePatrimony.Params
  model = mockPatrimonyModel()
  async update (patrimony: UpdatePatrimony.Params): Promise<SavePatrimony.Model> {
    this.params = patrimony
    return this.model
  }
}

export class SavePatrimonySpy implements SavePatrimony {
  params: SavePatrimony.Params
  model = mockPatrimonyModel()
  async save (patrimony: SavePatrimony.Params): Promise<SavePatrimony.Model> {
    this.params = patrimony
    return this.model
  }
}

export class CheckPatrimonyByIdSpy implements CheckPatrimonyById {
  params: CheckPatrimonyById.Params
  result = true
  async checkById (params: CheckPatrimonyById.Params): Promise<CheckPatrimonyById.Result> {
    this.params = params
    return this.result
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
