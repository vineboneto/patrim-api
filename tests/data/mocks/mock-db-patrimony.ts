import {
  AddPatrimonyRepository,
  CheckPatrimonyByFieldRepository,
  CheckPatrimonyByNumberRepository,
  CheckPatrimonyByOwnerIdRepository,
  DeletePatrimonyRepository,
  LoadPatrimoniesByCategoryIdRepository,
  LoadPatrimoniesByOwnerIdRepository,
  LoadPatrimoniesBySectorIdRepository,
  LoadPatrimoniesRepository,
  LoadPatrimonyByIdRepository,
  LoadPatrimonyByNumberRepository,
  LoadPatrimonyFieldByIdRepository,
  UpdatePatrimonyRepository
} from '@/data/protocols'
import {
  mockPatrimoniesModel,
  mockPatrimonyModel,
  mockUpdatePatrimonyParams
} from '@/tests/domain/mocks'

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

export class LoadPatrimonyFieldByIdRepositorySpy implements LoadPatrimonyFieldByIdRepository {
  id: number
  data: any = mockUpdatePatrimonyParams().number
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

export class CheckPatrimonyByNumberRepositorySpy implements CheckPatrimonyByNumberRepository {
  params: CheckPatrimonyByNumberRepository.Params
  callsCount = 0
  result = false
  async checkByNumber (params: CheckPatrimonyByNumberRepository.Params): Promise<boolean> {
    this.callsCount++
    this.params = params
    return this.result
  }
}

export class CheckPatrimonyByOwnerIdRepositorySpy implements CheckPatrimonyByOwnerIdRepository {
  params: CheckPatrimonyByOwnerIdRepository.Params
  result = false

  async checkByOwnerId (params: CheckPatrimonyByOwnerIdRepository.Params):
  Promise<CheckPatrimonyByOwnerIdRepository.Result> {
    this.params = params
    return this.result
  }
}

export class CheckPatrimonyByFieldByIdRepositorySpy implements CheckPatrimonyByFieldRepository {
  params: CheckPatrimonyByFieldRepository.Params
  result = false

  async checkByField (params: CheckPatrimonyByFieldRepository.Params): Promise<boolean> {
    this.params = params
    return this.result
  }
}
