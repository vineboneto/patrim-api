import { CheckExist, Controller, HttpResponse, Validation } from '@/presentation/protocols'
import { badRequest, forbidden, ok, serverError } from '@/presentation/helper'
import { AddOwner } from '@/domain/usecases'
import { InvalidParamError } from '@/presentation/errors'

export class AddOwnerController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly checkExist: CheckExist,
    private readonly addOwner: AddOwner
  ) {}

  async handle (request: AddOwnerController.Request): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request)
      if (error) {
        return badRequest(error)
      }
      const checkError = await this.checkExist.check(request)
      if (checkError) {
        return forbidden(checkError)
      }
      const owner = await this.addOwner.add(request)
      if (!owner) {
        return forbidden(new InvalidParamError('sectorId'))
      }
      return ok(owner)
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace AddOwnerController {
  export type Request = {
    name: string
    sectorId: number
  }
}
