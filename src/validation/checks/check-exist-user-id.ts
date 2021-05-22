import { CheckExist } from '@/presentation/protocols'
import { CheckExistsUserIdRepository } from '@/data/protocols'
import { AccessDeniedError } from '@/presentation/errors'

const field = 'accountId'

export class CheckExistUserId implements CheckExist {
  constructor (
    private readonly checkExistsUserIdRepository: CheckExistsUserIdRepository,
    private readonly database: string
  ) {}

  async check (input: object): Promise<Error> {
    const exists = await this.checkExistsUserIdRepository.checkUserId({
      accountId: input[field],
      database: this.database
    })
    if (!exists) {
      return new AccessDeniedError()
    }
    return null
  }
}
