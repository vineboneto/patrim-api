import { CheckAccessData } from '@/domain/usecases'
import { CheckAccessDataRepository } from '@/data/protocols'

export class DbCheckAccessData implements CheckAccessData {
  constructor (
    private readonly checkAccessDataRepository: CheckAccessDataRepository
  ) {}

  async checkAccess (params: CheckAccessData.Params): Promise<boolean> {
    for (const field of params.dataAccess) {
      const hasAccess = await this.checkAccessDataRepository.checkAccess({
        accountId: params.accountId,
        databaseName: field.databaseName,
        id: field.id
      })
      if (!hasAccess) {
        return false
      }
    }
    return true
  }
}
