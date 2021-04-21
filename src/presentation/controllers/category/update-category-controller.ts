import { badRequest } from '@/presentation/helper'
import { Controller, HttpResponse, Validation } from '@/presentation/protocols'

export class UpdateCategoryController implements Controller {
  constructor (
    private readonly validation: Validation
  ) {}

  async handle (request: UpdateCategoryController.Request): Promise<HttpResponse> {
    const error = this.validation.validate(request)
    if (error) {
      return badRequest(error)
    }
    return null
  }
}

export namespace UpdateCategoryController {
  export type Request = {
    id: number
    name: string
  }
}
