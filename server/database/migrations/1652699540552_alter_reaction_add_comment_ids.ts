import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class AlterReactionAddCommentIds extends BaseSchema {
  protected tableName = 'reactions'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table
        .integer('comment_id')
        .unsigned()
        .references('comments.id')
        .nullable()
        .onDelete('CASCADE')
    })
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('comment_id')
    })
  }
}
