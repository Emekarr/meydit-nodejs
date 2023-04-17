import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'makers'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id').primary()
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
      table.string('name').notNullable()
      table.string('email').notNullable()
      table.string('password').notNullable()
      table.string('bio')
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
