import { CheckExist } from '@/presentation/protocols'
import { CheckPlaceById } from '@/domain/usecases'
import { InvalidParamError } from '@/presentation/errors'

export class CheckExistPlaceId implements CheckExist {
  constructor (
    private readonly checkPlaceById: CheckPlaceById,
    private readonly fieldName: string
  ) {}

  async check (input: object): Promise<Error> {
    const isValid = await this.checkPlaceById.checkById({ id: input[this.fieldName] })
    if (!isValid) {
      return new InvalidParamError(this.fieldName)
    }
    return null
  }
}
