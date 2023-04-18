import { DateTime } from 'luxon'
import { BaseModel, column, beforeSave, beforeCreate } from '@ioc:Adonis/Lucid/Orm'
import Hasher from '@ioc:Adonis/Core/Hash'
import generateID from 'App/Utils/GenerateID'

export default class Maker extends BaseModel {
  public static selfAssignPrimaryKey = true
  
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

  @column()
  public name: string

  @column()
  public email: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public bio: string | null

  @beforeSave()
  public static async hashPasswordBeforeCreation(maker: Maker) {
    maker.password = await Hasher.make(maker.password)
  }

  @beforeCreate()
  public static async generateIDBeforeCreate(maker: Maker) {
    maker.id = generateID()
  }
}
