import { DateTime } from 'luxon'
import { BaseModel, beforeSave, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import Job from './Job'
import Hasher from '@ioc:Adonis/Core/Hash'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column.dateTime({ autoCreate: true, serialize: (value) => value.toFormat('dd MMMM yyyy') })
  public createdAt: DateTime

  @column.dateTime({
    autoCreate: true,
    autoUpdate: true,
    serialize: (value) => value.toFormat('dd MMMM yyyy'),
  })
  public updatedAt: DateTime

  @hasMany(() => Job)
  public jobs: HasMany<typeof Job>

  @column()
  public email: string

  @column({ serializeAs: null })
  public password: string

  @column({ columnName: 'remember_me_token' })
  public rememberMeToken: string

  @column({ columnName: 'first_name' })
  public firstName: string

  @column({ columnName: 'last_name' })
  public lastName: string

  @column()
  public phone: string

  @beforeSave()
  public static async hashPasswordBeforeCreation(user: User) {
    user.password = await Hasher.make(user.password)
  }
}
