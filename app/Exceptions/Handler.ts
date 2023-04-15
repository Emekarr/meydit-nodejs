import Logger from '@ioc:Adonis/Core/Logger'
import HttpExceptionHandler from '@ioc:Adonis/Core/HttpExceptionHandler'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ServerResponse from '../Utils/Response'

export default class ExceptionHandler extends HttpExceptionHandler {
  constructor() {
    super(Logger)
  }

  handle(error: any, ctx: HttpContextContract): Promise<any> {
    if (error?.messages?.errors) {
      new ServerResponse()
        .setStatusCode(400)
        .setMessage('an error occured')
        .setErrors(...error?.messages?.errors)
        .respond(ctx)
      return Promise.resolve()
    }
    new ServerResponse()
      .setStatusCode(400)
      .setMessage('an error occured')
      .setErrors(error)
      .respond(ctx)
    return Promise.resolve()
  }
}
