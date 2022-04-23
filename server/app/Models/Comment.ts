import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import Post from './Post'

export default class Comment extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public body: string

  // komentář náleží jednomu článku (postu)
  @column()
  public postId: number

  @belongsTo(() => Post)
  public post: BelongsTo<typeof Post>
  // END komentář náleží jednomu článku (postu)

  // komentář náleží jednomu autorovi (userovi)
  @column()
  public userId: number

  @belongsTo(() => User)
  public author: BelongsTo<typeof User>
  // END komentář náleží jednomu autorovi (userovi)

  // @belongsTo(() => User)
  // public author: BelongsTo<typeof User>

  // @hasMany(() => Comment)
  // public children: HasMany<typeof Comment>

  // @belongsTo(() => Comment)
  // public parentId: BelongsTo<typeof Comment>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
