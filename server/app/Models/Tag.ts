import { DateTime } from 'luxon'
import { BaseModel, column, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import Post from './Post'

export default class Tag extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  // @hasMany(() => Post, {
  //   foreignKey: 'id',
  // })
  // public posts: HasMany<typeof Post>

  @manyToMany(() => Post, {
    pivotTable: 'post_tags',
    pivotColumns: ['post_id'],
  })
  public relatedTo: ManyToMany<typeof Post>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
