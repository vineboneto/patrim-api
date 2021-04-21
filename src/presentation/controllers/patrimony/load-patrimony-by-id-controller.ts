import { Controller, HttpResponse, Validation } from '@/presentation/protocols'

export class LoadPatrimonyByIdController implements Controller {
  constructor (
    private readonly validation: Validation
  ) {}

  async handle (request: LoadPatrimonyByIdController.Request): Promise<HttpResponse> {
    this.validation.validate(request)
    return null
  }
}

export namespace LoadPatrimonyByIdController {
  export type Request = {
    id: number
  }
}
