import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'jobs'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id').primary()
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
      table.string('user_id').notNullable().index()
      table.string('first_name').notNullable()
      table.string('last_name').notNullable()
      table.string('post_code').notNullable().index()
      table.string('state').notNullable().index()
      table.string('address').notNullable()
      table.string('type').notNullable().index()
      table.jsonb('images_url')
      table.string('description').notNullable()
      table.integer('budget').notNullable()
    })
  }

  public async down() {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id').primary()
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
      table.string('user_id').notNullable()
      table.string('first_name').notNullable()
      table.string('last_name').notNullable()
      table.string('post_code').notNullable()
      table.string('state').notNullable()
      table.string('address').notNullable()
      table.string('type').notNullable()
      table.jsonb('images_url')
      table.string('description').notNullable()
      table.integer('budget').notNullable()
    })
  }
}
