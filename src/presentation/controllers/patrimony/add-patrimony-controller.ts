import { CheckExist, Controller, HttpResponse, Validation } from '@/presentation/protocols'
import { badRequest, forbidden, ok, serverError, unprocessableEntity } from '@/presentation/helper'
import { AlreadyExistsError } from '@/presentation/errors'
import { AddPatrimony } from '@/domain/usecases'

export class AddPatrimonyController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly checkExist: CheckExist,
    private readonly addPatrimony: AddPatrimony
  ) {}

  async handle (request: AddPatrimonyController.Request): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request)
      if (error) {
        return badRequest(error)
      }
      const checkError = await this.checkExist.check(request)
      if (checkError) {
        return forbidden(checkError)
      }
      const patrimonyModel = await this.addPatrimony.add(request)
      if (!patrimonyModel) {
        return unprocessableEntity(new AlreadyExistsError(request.number))
      }
      return ok(patrimonyModel)
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace AddPatrimonyController {
  export type Request = {
    number: string
    brand: string
    description?: string
    categoryId: number
    placeId: number
    ownerId: number
  }
}
