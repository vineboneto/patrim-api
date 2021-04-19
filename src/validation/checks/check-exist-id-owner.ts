import { CheckExist } from '@/presentation/protocols'
import { CheckOwnerById } from '@/domain/usecases'

export class CheckExistIdOwner implements CheckExist {
  constructor (
    private readonly checkOwnerById: CheckOwnerById,
    private readonly fieldName: string
  ) {}

  async check (input: object): Promise<Error> {
    await this.checkOwnerById.checkById({ id: input[this.fieldName] })
    return null
  }
}
