import { badRequest } from '@/presentation/helper'
import { CheckExist, Controller, HttpResponse, Validation } from '@/presentation/protocols'

export class UpdatePatrimonyController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly checkExist: CheckExist
  ) {}

  async handle (request: UpdatePatrimonyController.Request): Promise<HttpResponse> {
    const error = this.validation.validate(request)
    if (error) {
      return badRequest(error)
    }
    await this.checkExist.check(request)
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
