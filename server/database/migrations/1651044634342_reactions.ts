import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Reactions extends BaseSchema {
  protected tableName = 'reactions'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.unique(['user_id', 'post_id', 'category'])

      table.increments('id')

      table.integer('user_id').unsigned().references('users.id')
      table.integer('post_id').unsigned().references('posts.id')
      table.string('category')

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
