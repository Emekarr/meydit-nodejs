import { HttpContext } from '@adonisjs/core/build/standalone'

interface ResponsePayload {
  errors: string[] | null
  body: any | null
  message: string
  success: boolean
}

export default class ServerResponse {
  private payload: ResponsePayload = {
    errors: null,
    body: null,
    message: 'success',
    success: true,
  }

  private statusCode = 200

  setMessage(msg: string) {
    this.payload.message = msg
    return this
  }

  setErrors(...errors: Error[]) {
    this.payload.errors = []
    errors.forEach((e) => {
      this.payload.errors!.push(e.message)
    })
    return this
  }

  setSuccess(success: boolean) {
    this.payload.success = success
    return this
  }

  setBody(body: any) {
    this.payload.body = body
    return this
  }

  setStatusCode(code: number) {
    this.statusCode = code
    return this
  }

  respond(ctx: HttpContext) {
    ctx.response.status(this.statusCode).json(this.payload)
  }
}
