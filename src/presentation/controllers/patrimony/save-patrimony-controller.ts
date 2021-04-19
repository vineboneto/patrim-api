import { CheckExist, Controller, HttpResponse, Validation } from '@/presentation/protocols'
import { badRequest, ok, serverError, unprocessableEntity } from '@/presentation/helper'
import { SavePatrimony } from '@/domain/usecases'
import { AlreadyExistsError } from '@/presentation/errors'

export class SavePatrimonyController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly checkExist: CheckExist,
    private readonly savePatrimony: SavePatrimony
  ) {}

  async handle (request: SavePatrimonyController.Request): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request)
      if (error) {
        return badRequest(error)
      }
      await this.checkExist.check(request)
      const patrimonyModel = await this.savePatrimony.save(request)
      if (!patrimonyModel) {
        return unprocessableEntity(new AlreadyExistsError(request.number))
      }
      return ok(patrimonyModel)
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace SavePatrimonyController {
  export type Request = {
    id?: number
    number: string
    brand: string
    description?: string
    categoryId: number
    placeId: number
    ownerId: number
  }
}
