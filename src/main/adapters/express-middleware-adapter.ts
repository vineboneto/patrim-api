import { Middleware } from '@/presentation/protocols'

import { Request, Response, NextFunction } from 'express'

export const adaptMiddleware = (middleware: Middleware) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const request = {
      accessToken: req.headers?.['x-access-token'],
      ...(req.headers || {}),
      id: req.params?.id
    }
    const httpResponse = await middleware.handle(request)
    if (httpResponse.statusCode === 204) {
      next()
    } else if (httpResponse.statusCode === 404) {
      res.status(404).send()
    } else {
      res.status(httpResponse.statusCode).json({ error: httpResponse.body?.message })
    }
  }
}
