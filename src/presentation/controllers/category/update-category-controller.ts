import { Controller, HttpResponse, Validation } from '@/presentation/protocols'

export class UpdateCategoryController implements Controller {
  constructor (
    private readonly validation: Validation
  ) {}

  async handle (request: UpdateCategoryController.Request): Promise<HttpResponse> {
    this.validation.validate(request)
    return null
  }
}

export namespace UpdateCategoryController {
  export type Request = {
    id: number
    name: string
  }
}
