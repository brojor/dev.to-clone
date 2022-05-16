import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import Post from './Post'
import Comment from './Comment'

type Category = 'like' | 'readinglist' | 'unicorn'

export default class Reaction extends BaseModel {
  @column({ isPrimary: true, serializeAs: null })
  public id: number

  @column({})
  public userId: number
  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @column({ serializeAs: null })
  public postId: number
  @belongsTo(() => Post)
  public post: BelongsTo<typeof Post>

  @column({ serializeAs: null })
  public commentId: number
  @belongsTo(() => Comment, { serializeAs: null })
  public comment: BelongsTo<typeof Comment>

  @column({ serializeAs: null })
  public category: Category

  @column.dateTime({ autoCreate: true, serializeAs: null })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  public updatedAt: DateTime
}
