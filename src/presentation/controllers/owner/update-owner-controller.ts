import { CheckExist, Controller, HttpResponse, Validation } from '@/presentation/protocols'
import { badRequest, forbidden, ok, serverError } from '@/presentation/helper'
import { UpdateOwner } from '@/domain/usecases'
import { InvalidParamError } from '@/presentation/errors'

export class UpdateOwnerController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly checkExist: CheckExist,
    private readonly updateOwner: UpdateOwner
  ) {}

  async handle (request: UpdateOwnerController.Request): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request)
      if (error) {
        return badRequest(error)
      }
      const checkError = await this.checkExist.check(request)
      if (checkError) {
        return forbidden(checkError)
      }
      const owner = await this.updateOwner.update(request)
      if (!owner) {
        return forbidden(new InvalidParamError('sectorId'))
      }
      return ok(owner)
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace UpdateOwnerController {
  export type Request = {
    id: number
    name: string
    sectorId: number
  }
}
