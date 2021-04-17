import { Controller, HttpResponse, Validation } from '@/presentation/protocols'
import { badRequest } from '@/presentation/helper'
import { SavePlace } from '@/domain/usecases'

export class SavePlaceController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly savePlace: SavePlace
  ) {}

  async handle (request: SavePlaceController.Request): Promise<HttpResponse> {
    const error = this.validation.validate(request)
    if (error) {
      return badRequest(error)
    }
    await this.savePlace.save(request)
    return null
  }
}

export namespace SavePlaceController {
  export type Request = {
    id?: number
    name: string
  }
}
