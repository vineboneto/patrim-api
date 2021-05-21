import { CheckExistsUserIdRepository } from '@/data/protocols'

export class CheckExistsUserIdRepositorySpy implements CheckExistsUserIdRepository {
  params: CheckExistsUserIdRepository.Params
  model = true
  async checkUserId (params: CheckExistsUserIdRepository.Params): Promise<CheckExistsUserIdRepository.Model> {
    this.params = params
    return this.model
  }
}
