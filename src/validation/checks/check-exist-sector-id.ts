import { CheckExist } from '@/presentation/protocols'
import { CheckSectorById } from '@/domain/usecases'
import { InvalidParamError } from '@/presentation/errors'

export class CheckExistSectorId implements CheckExist {
  constructor (
    private readonly checkSectorById: CheckSectorById,
    private readonly fieldName: string
  ) {}

  async check (input: object): Promise<Error> {
    const isValid = await this.checkSectorById.checkById({ id: input[this.fieldName] })
    if (!isValid) {
      return new InvalidParamError(this.fieldName)
    }
    return null
  }
}
