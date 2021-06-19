import { Controller, HttpResponse, Validation } from '@/presentation/protocols'
import { badRequest } from '@/presentation/helper'

export class ValidationRequestDecorator implements Controller {
  constructor (
    private readonly controller: Controller,
    private readonly validation: Validation
  ) {}

  async handle (request: any): Promise<HttpResponse> {
    const error = this.validation.validate(request)
    if (error) {
      return badRequest(error)
    }
    return this.controller.handle(request)
  }
}
