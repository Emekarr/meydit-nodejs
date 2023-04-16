import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ServerResponse from 'App/Utils/Response'

export default class UsersController {
  public async fetchProfile(ctx: HttpContextContract) {
    const user = ctx.auth.user
    new ServerResponse().setBody(user).setMessage('profile fetched').respond(ctx)
  }
}
