import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { userPayloadValidatorSchema } from './Validators/UserValidators'
import { UserPayload } from './Types/User'
import ServerResponse from 'App/Utils/Response'
import Hasher from '@ioc:Adonis/Core/Hash'
import User from 'App/Models/User'
import generateID from 'App/Utils/GenerateID'

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
}
