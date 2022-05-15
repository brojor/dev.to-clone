import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class AlterCommentsAddParentIds extends BaseSchema {
  protected tableName = 'comments'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      // table.integer('parent_id').unsigned()
      table.integer('reply_to').unsigned().references('comments.id').nullable()

      table.integer('root_parent_id').unsigned().references('comments.id')
      table.integer('level_index').notNullable().defaultTo(0)

      // table.string('name').nullable()
      // table.integer('state_id').unsigned().notNullable()
      table.boolean('is_archived').notNullable().defaultTo(false)
    })
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      // table.dropColumn('parent_id')
      table.dropColumn('reply_to')

      table.dropColumn('root_parent_id')
      table.dropColumn('level_index')
      table.dropColumn('is_archived')
    })
  }
}
