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
    this.validate({ name, userId })
    return null
  }

  private validate ({ name, userId }: AddPlaceController.Request): void {
    if (!userId) {
      this.validation.validate({ name })
    } else {
      this.validation.validate({ name, userId })
    }
  }
}

export namespace AddPlaceController {
  export type Request = {
    name: string
    userId?: string
  }
}
