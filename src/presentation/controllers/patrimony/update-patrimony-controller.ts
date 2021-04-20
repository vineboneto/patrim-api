import { CheckExist, Controller, HttpResponse, Validation } from '@/presentation/protocols'
import { badRequest, forbidden, unprocessableEntity } from '@/presentation/helper'
import { UpdatePatrimony } from '@/domain/usecases'
import { AlreadyExistsError } from '@/presentation/errors'

export class UpdatePatrimonyController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly checkExist: CheckExist,
    private readonly updatePatrimony: UpdatePatrimony
  ) {}

  async handle (request: UpdatePatrimonyController.Request): Promise<HttpResponse> {
    const error = this.validation.validate(request)
    if (error) {
      return badRequest(error)
    }
    const checkError = await this.checkExist.check(request)
    if (checkError) {
      return forbidden(checkError)
    }
    const patrimonyModel = await this.updatePatrimony.update(request)
    if (!patrimonyModel) {
      return unprocessableEntity(new AlreadyExistsError(request.number))
    }
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
