import { Controller, HttpResponse, Validation } from '@/presentation/protocols'

export class SavePlaceController implements Controller {
  constructor (
    private readonly validation: Validation
  ) {}

  async handle (request: SavePlaceController.Request): Promise<HttpResponse> {
    this.validation.validate(request)
    return null
  }
}

export namespace SavePlaceController {
  export type Request = {
    id?: number
    name: string
  }
}
