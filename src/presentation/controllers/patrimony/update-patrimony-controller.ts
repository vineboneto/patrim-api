import { Controller, HttpResponse, Validation } from '@/presentation/protocols'

export class UpdatePatrimonyController implements Controller {
  constructor (
    private readonly validation: Validation
  ) {}

  async handle (request: UpdatePatrimonyController.Request): Promise<HttpResponse> {
    this.validation.validate(request)
    return null
  }
}

export namespace UpdatePatrimonyController {
  export type Request = {
    id: number
    number: string
    brand: string
    description?: string
    categoryId: number
    placeId: number
    ownerId: number
  }
}
