import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { userPayloadValidatorSchema } from './Validators/UserValidators'
import { UserPayload } from './Types/User'
import ServerResponse from 'App/Utils/Response'
import Hasher from '@ioc:Adonis/Core/Hash'
import User from 'App/Models/User'
import generateID from 'App/Utils/GenerateID'
import { makerPayloadValidatorSchema } from './Validators/MakerValidator'
import { MakerPayload } from './Types/Maker'
import Maker from 'App/Models/Maker'

export default class AuthController {
  public async createUser(ctx: HttpContextContract) {
    const { schema, messages } = userPayloadValidatorSchema()
    const validatedpPayload = (await ctx.request.validate({
      schema,
      messages,
    })) as UserPayload
    validatedpPayload.password = await Hasher.make(validatedpPayload.password)
    const user = await User.create({ ...validatedpPayload, id: generateID() })
    await ctx.auth.login(user)
    new ServerResponse().setMessage('user created').setBody(user.toJSON()).respond(ctx)
  }

  public async loginUser(ctx: HttpContextContract) {
    const { password, email } = ctx.request.only(['password', 'email'])
    await ctx.auth.attempt(email, password)
    const user = await User.query().where('email', email).first()
    new ServerResponse().setMessage('login successful').setBody(user!.toJSON()).respond(ctx)
  }

  public async createMaker(ctx: HttpContextContract) {
    const { messages, schema } = makerPayloadValidatorSchema()
    const validatedpPayload = (await ctx.request.validate({ schema, messages })) as MakerPayload
    const maker = await Maker.create(validatedpPayload)
    await ctx.auth.use('maker').login(maker)
    new ServerResponse()
      .setMessage('maker account created')
      .setBody(maker)
      .setStatusCode(201)
      .respond(ctx)
  }

  public async loginMaker(ctx: HttpContextContract) {
    const { password, email } = ctx.request.only(['password', 'email'])
    await ctx.auth.use('maker').attempt(email, password)
    const maker = await Maker.query().where('email', email).first()
    new ServerResponse().setMessage('login successful').setBody(maker!.toJSON()).respond(ctx)
  }
}
