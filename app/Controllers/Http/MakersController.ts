import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ServerResponse from 'App/Utils/Response'

export default class MakersController {
  public async fetchProfile(ctx: HttpContextContract) {
    const maker = ctx.auth.use('maker').user
    new ServerResponse().setBody(maker).setMessage('profile fetched').respond(ctx)
  }
}
