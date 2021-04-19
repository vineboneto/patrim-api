import { badRequest } from '@/presentation/helper'
import { Controller, HttpResponse, Validation } from '@/presentation/protocols'

export class SavePatrimonyController implements Controller {
  constructor (
    private readonly validation: Validation
  ) {}

  async handle (request: SavePatrimonyController.Request): Promise<HttpResponse> {
    const error = this.validation.validate(request)
    if (error) {
      return badRequest(error)
    }
    return null
  }
}

export namespace SavePatrimonyController {
  export type Request = {
    id?: number
    number: string
    brand: string
    description?: string
    categoryId: number
    placeId: number
    ownerId: number
  }
}
