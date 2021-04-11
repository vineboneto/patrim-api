import { Controller, HttpResponse, Validation } from '@/presentation/protocols'
import { SavePlace, CheckAccountById } from '@/domain/usecases'

export class AddPlaceController implements Controller {
  constructor (
    private readonly savePlace: SavePlace,
    private readonly checkAccountById: CheckAccountById,
    private readonly validation: Validation
  ) {}

  async handle (request: AddPlaceController.Request): Promise<HttpResponse> {
    const { name, userId } = request
    if (!userId) this.validation.validate({ name })
    return null
  }
}

export namespace AddPlaceController {
  export type Request = {
    name: string
    userId?: number
  }
}
