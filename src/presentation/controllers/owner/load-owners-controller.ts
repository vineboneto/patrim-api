import { Controller, HttpResponse, Validation } from '@/presentation/protocols'

export class LoadOwnersController implements Controller {
  constructor (
    private readonly validation: Validation
  ) {}

  async handle (request: LoadOwnersController.Request): Promise<HttpResponse> {
    this.validation.validate(request)
    return null
  }
}

export namespace LoadOwnersController {
  export type Request = {
    take: string
    skip: string
  }
}
