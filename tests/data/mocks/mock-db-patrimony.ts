import {
  AddPatrimonyRepository,
  CheckDataByFieldRepository,
  DeletePatrimonyRepository,
  LoadPatrimoniesByCategoryIdRepository,
  LoadPatrimoniesByOwnerIdRepository,
  LoadPatrimoniesBySectorIdRepository,
  LoadPatrimoniesRepository,
  LoadPatrimonyByIdRepository,
  LoadPatrimonyByNumberRepository,
  LoadDataFieldByIdRepository,
  UpdatePatrimonyRepository
} from '@/data/protocols'
import { mockPatrimoniesModel, mockPatrimonyModel } from '@/tests/domain/mocks'

export class AddPatrimonyRepositorySpy implements AddPatrimonyRepository {
  params: AddPatrimonyRepository.Params
  model = mockPatrimonyModel()
  async add (params: AddPatrimonyRepository.Params): Promise<AddPatrimonyRepository.Model> {
    this.params = params
    return this.model
  }
}

export class UpdatePatrimonyRepositorySpy implements UpdatePatrimonyRepository {
  params: UpdatePatrimonyRepository.Params
  model = mockPatrimonyModel()
  async update (params: UpdatePatrimonyRepository.Params): Promise<UpdatePatrimonyRepository.Model> {
    this.params = params
    return this.model
  }
}

export class DeletePatrimonyRepositorySpy implements DeletePatrimonyRepository {
  model = mockPatrimonyModel()
  params: DeletePatrimonyRepository.Params
  async delete (params: DeletePatrimonyRepository.Params): Promise<DeletePatrimonyRepository.Model> {
    this.params = params
    return this.model
  }
}

export class LoadPatrimoniesRepositorySpy implements LoadPatrimoniesRepository {
  params: LoadPatrimoniesRepository.Params
  result = {
    model: mockPatrimoniesModel(),
    count: mockPatrimoniesModel().length
  }

  async loadAll (params: LoadPatrimoniesRepository.Params): Promise<LoadPatrimoniesRepository.Model> {
    this.params = params
    return this.result
  }
}

export class LoadPatrimonyByIdRepositorySpy implements LoadPatrimonyByIdRepository {
  params: LoadPatrimonyByIdRepository.Params
  model = mockPatrimonyModel()
  async loadById (params: LoadPatrimonyByIdRepository.Params): Promise<LoadPatrimonyByIdRepository.Model> {
    this.params = params
    return this.model
  }
}

export class LoadPatrimonyByNumberRepositorySpy implements LoadPatrimonyByNumberRepository {
  params: LoadPatrimonyByNumberRepository.Params
  model = mockPatrimonyModel()
  async loadByNumber (params: LoadPatrimonyByNumberRepository.Params): Promise<LoadPatrimonyByNumberRepository.Model> {
    this.params = params
    return this.model
  }
}

export class LoadDataFieldByIdRepositorySpy implements LoadDataFieldByIdRepository {
  id: number
  data: any

  async loadFieldById (id: number): Promise<any> {
    this.id = id
    return this.data
  }
}

export class LoadPatrimoniesByOwnerIdRepositorySpy implements LoadPatrimoniesByOwnerIdRepository {
  params: LoadPatrimoniesByOwnerIdRepository.Params
  result = {
    model: mockPatrimoniesModel(),
    count: mockPatrimoniesModel().length
  }

  async loadByOwnerId (params: LoadPatrimoniesByOwnerIdRepository.Params):
  Promise<LoadPatrimoniesByOwnerIdRepository.Model> {
    this.params = params
    return this.result
  }
}

export class LoadPatrimoniesBySectorIdRepositorySpy implements LoadPatrimoniesBySectorIdRepository {
  params: LoadPatrimoniesBySectorIdRepository.Params
  result = {
    model: mockPatrimoniesModel(),
    count: mockPatrimoniesModel().length
  }

  async loadBySectorId (params: LoadPatrimoniesBySectorIdRepository.Params):
  Promise<LoadPatrimoniesBySectorIdRepository.Model> {
    this.params = params
    return this.result
  }
}

export class LoadPatrimoniesByCategoryIdRepositorySpy implements LoadPatrimoniesByCategoryIdRepository {
  params: LoadPatrimoniesByCategoryIdRepository.Params
  result = {
    model: mockPatrimoniesModel(),
    count: mockPatrimoniesModel().length
  }

  async loadByCategoryId (params: LoadPatrimoniesByCategoryIdRepository.Params):
  Promise<LoadPatrimoniesByCategoryIdRepository.Model> {
    this.params = params
    return this.result
  }
}

export class CheckDataByFieldRepositorySpy implements CheckDataByFieldRepository {
  params: CheckDataByFieldRepository.Params
  result = false
  callsCount = 0

  async checkByField (params: CheckDataByFieldRepository.Params): Promise<boolean> {
    this.callsCount++
    this.params = params
    return this.result
  }
}
