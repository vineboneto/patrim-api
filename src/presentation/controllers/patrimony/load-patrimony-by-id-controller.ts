import { CheckExist, Controller, HttpResponse, Validation } from '@/presentation/protocols'
import { badRequest, forbidden, serverError } from '@/presentation/helper'

export class LoadPatrimonyByIdController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly checkExist: CheckExist
  ) {}

  async handle (request: LoadPatrimonyByIdController.Request): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request)
      if (error) {
        return badRequest(error)
      }
      const checkError = await this.checkExist.check(request)
      if (checkError) {
        return forbidden(checkError)
      }
      return null
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace LoadPatrimonyByIdController {
  export type Request = {
    id: number
  }
}
